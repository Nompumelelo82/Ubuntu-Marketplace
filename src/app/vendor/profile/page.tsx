export default function VendorProfilePage() {
  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Vendor Profile</h1>
      <form className="card p-6 space-y-4">
        <input className="input" placeholder="Business Name" />
        <input className="input" placeholder="Owner Name" />
        <input className="input" placeholder="Email" />
        <input className="input" placeholder="Phone Number" />
        <button type="submit" className="btn btn-primary w-full">
          Save Changes
        </button>
      </form>
    </div>
  );
}