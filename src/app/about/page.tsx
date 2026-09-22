import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-6">About Ubuntu Marketplace</h1>

        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-2">What We Are</h2>
            <p className="text-[#1F2937]/80">
              Ubuntu Marketplace is a trusted campus-community platform where
              students, faculty, vendors and residents can buy, sell, trade
              and discover products and services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">The Problem We Solve</h2>
            <p className="text-[#1F2937]/80">
              Buying and selling within a campus community can be unsafe and
              disorganised. Ubuntu Marketplace brings it into one trusted,
              verified space.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Who Can Use It</h2>
            <p className="text-[#1F2937]/80">
              Students, faculty, residents and vendors — anyone connected to
              the CPUT community.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              Connecting the CPUT Community
            </h2>
            <p className="text-[#1F2937]/80">
              From textbooks to tutoring services, Ubuntu Marketplace links
              people who need something with people who have it.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              Trusted Buying & Selling
            </h2>
            <p className="text-[#1F2937]/80">
              Verified sellers and vendors give buyers confidence in every
              transaction.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              Community Participation
            </h2>
            <p className="text-[#1F2937]/80">
              Our bulletin board keeps the community informed with events,
              announcements and services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              Sustainability & Second-Hand Trading
            </h2>
            <p className="text-[#1F2937]/80">
              Reusing and reselling goods reduces waste and keeps items
              useful for longer within the community.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}