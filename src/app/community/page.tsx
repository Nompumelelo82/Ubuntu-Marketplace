import Navbar from "@/components/Navbar";
import { communityPosts } from "@/lib/mockData";

export default function AdminCommunityPage() {
  return (
    <div>
      <Navbar />
      <div className="pt-8">
        <h1 className="text-2xl font-bold mb-6">Community</h1>
        <div className="space-y-4">
          {communityPosts.map((post) => (
            <div key={post.id} className="card p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold">{post.title}</p>
                <p className="text-sm text-[#1F2937]/60">
                  {post.category} · Posted by {post.postedBy}
                </p>
              </div>
              <button className="btn btn-danger">Remove</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}