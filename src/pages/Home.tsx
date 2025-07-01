import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Home</h1>
        <p className="text-lg text-gray-700">This is the Home page. Add your content here.</p>
      </main>
      <Footer />
    </>
  );
} 