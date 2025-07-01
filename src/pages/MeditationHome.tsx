import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function MeditationHome() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Meditation Centre Home</h1>
        <div className="max-w-xl w-full bg-white rounded-xl shadow p-8 mt-8">
          <h2 className="text-2xl font-semibold mb-2">About Us</h2>
          <p className="text-gray-700">[Write about the person here: their background, vision, and contribution to the meditation centre.]</p>
        </div>
      </main>
      <Footer />
    </>
  );
} 