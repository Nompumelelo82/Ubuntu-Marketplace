import { communityPosts } from "@/lib/mockData";

export default function VendorCommunityPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Community Bulletin Board</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {communityPosts.map((post) => (
          <div key={post.id} className="card p-6">
            <span className="text-xs font-semibold text-[#E95420] uppercase">
              {post.category}
            </span>
            <h3 className="font-semibold text-lg mt-2">{post.title}</h3>
            <p className="text-[#1F2937]/70 text-sm mt-2">{post.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}