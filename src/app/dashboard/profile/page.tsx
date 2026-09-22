export default function ProfilePage() {
  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <form className="card p-6 space-y-4">
        <input className="input" defaultValue="Nonhlanhla" placeholder="Full Name" />
        <input className="input" defaultValue="nonhlanhla@cput.ac.za" placeholder="Email" />
        <input className="input" placeholder="Phone Number" />
        <input className="input" type="password" placeholder="New Password" />
        <button type="submit" className="btn btn-primary w-full">
          Save Changes
        </button>
      </form>
    </div>
  );
}