import { deleteObject, getStorage, ref } from "firebase/storage";
import { app } from "@/firebase";

const storage = getStorage(app);

// Only deletes images that live in your Firebase Storage.
// Placeholder (Unsplash) URLs are skipped.
export async function deleteStorageImage(url: string) {
  if (!url.includes("firebasestorage.googleapis.com")) return;
  try {
    await deleteObject(ref(storage, url));
  } catch (err) {
    console.error("Could not delete image:", err);
  }
}