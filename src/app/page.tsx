import { BentoGrid } from "./components/bento-grid";
import { ProductParallax } from "./components/best-product";
import NavbarDemo from "./components/navbar";
import { FlipWords } from "./components/ui/flip-words";
import { AboutUs } from "./components/about";
import { AnimatedText } from "./components/animatedtext";
import { HeroScrollDemo } from "./components/review-container";
import { Footer } from "./components/footer"; // Import Footer component

export default function Home() {
  const words = ["Modern", "Stylish", "Affordable", "Finest"];

  return (
    <div className="font-poppins">
      <NavbarDemo />

      {/* Hero Section */}
      <div className="min-h-screen pt-[150px] flex flex-col justify-center items-center px-4 text-center font-poppins">
        <div className="text-7xl font-extralight text-neutral-700 dark:text-neutral-900">
          Find <FlipWords words={words} /> <br />
          Prayer need in{" "}
          <span style={{ fontFamily: "'Engravers MT', serif" }}>KENZI</span>
        </div>

        {/* Descriptive Text */}
        <p className="mt-6 text-lg max-w-xl text-neutral-500 dark:text-neutral-400">
        Temukan koleksi mukena elegan dan modern yang dirancang dengan mengutamakan kenyamanan, kualitas, dan keindahan. Mulailah tampil anggun dan nyaman saat beribadah dengan pilihan mukena terbaik kami hari ini.
        </p>

        {/* Custom Buttons */}
        <div className="mt-6 flex gap-4">
          <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-neutral-700 transition">
            Explore
          </button>
          <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-neutral-700 transition">
            Cek Katalog
          </button>
        </div>

        {/* Bento Grid Section */}
        <div className="mt-12 w-full">
          <BentoGrid />
        </div>
      </div>

      <div className="mt-50 w-full flex justify-center items-center">
        <div className="w-2/3">
          <AnimatedText />
        </div>
      </div>

      {/* Hero Parallax Section */}
      <div className="mt-50 w-full">
        <ProductParallax />
      </div>

      {/* About Us Section - Added id="about" here */}
      <div id="about" className="mt-12 w-full">
        <AboutUs />
      </div>

      {/* Review Section */}
      <div className="mt-12 w-full">
        <HeroScrollDemo />
      </div>

      {/* Footer Section */}
      <Footer /> {/* Add Footer at the end of the page */}
    </div>
  );
}