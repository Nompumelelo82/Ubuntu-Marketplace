"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";
import { db } from "@/firebase";
import { getApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { deleteStorageImage } from "@/lib/deleteStorageImage";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage(getApp());

export default function EditListingPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user, loading } = useAuth();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [currentImage, setCurrentImage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    condition: "",
  });

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const snap = await getDoc(doc(db, "products", id));
      if (!snap.exists() || snap.data().sellerId !== user.uid) {
        router.push("/vendor/listings");
        return;
      }
      const d = snap.data();
      setForm({
        name: d.name,
        description: d.description,
        price: String(d.price),
        category: d.category,
        condition: d.condition,
      });
      setCurrentImage(d.image);
      setFetching(false);
    })();
  }, [user, id, router]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      setError("Image must be under 5MB.");
      return;
    }
    setError("");
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  if (loading || !user || fetching) return <p className="p-8">Loading...</p>;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      let imageUrl = currentImage;

      if (file) {
        const storageRef = ref(
          storage,
          `products/${user!.uid}/${Date.now()}-${file.name}`
        );
        await uploadBytes(storageRef, file);
        imageUrl = await getDownloadURL(storageRef);
      }

      await updateDoc(doc(db, "products", id), {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        category: form.category,
        condition: form.condition,
        image: imageUrl,
      });

      // Remove the old photo only after the update succeeded
      if (file) await deleteStorageImage(currentImage);

      router.push("/vendor/listings");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Edit Listing</h1>
      <form onSubmit={handleSubmit} className="card p-6 space-y-4">
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <input className="input" name="name" placeholder="Product Name"
          value={form.name} onChange={handleChange} required />
        <textarea className="input" name="description" placeholder="Description" rows={4}
          value={form.description} onChange={handleChange} required />
        <input className="input" name="price" type="number" placeholder="Price (R)"
          value={form.price} onChange={handleChange} required />
        <select className="input" name="category" value={form.category}
          onChange={handleChange} required>
          <option value="">Category</option>
          <option>Textbooks</option>
          <option>Electronics</option>
          <option>Furniture</option>
        </select>
        <select className="input" name="condition" value={form.condition}
          onChange={handleChange} required>
          <option value="">Condition</option>
          <option>New</option>
          <option>Like New</option>
          <option>Good</option>
          <option>Fair</option>
        </select>

        <img
          src={preview || currentImage}
          alt="Product"
          className="w-full h-48 object-cover rounded-xl"
        />
        <input className="input" type="file" accept="image/*" onChange={handleFile} />
        <p className="text-xs text-[#1F2937]/50">
          Choose a file only if you want to replace the current photo.
        </p>

        <button type="submit" className="btn btn-primary w-full" disabled={submitting}>
          {submitting ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}