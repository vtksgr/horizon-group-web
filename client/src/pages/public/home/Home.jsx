import TopBar from "../../../components/public/TopBar";
import Navbar from "../../../components/public/Navbar";
import HeroSection from "./sections/HeroSection";
import OurVision from "./sections/OurVision";
import OurStrength from "./sections/OurStrength";
import ServiceSection from "./sections/ServiceSection";


export default function Home() {
  return (
    <>
      {/* Fullscreen Hero Area */}
      <section className="h-dvh overflow-hidden">
        <TopBar />
        <Navbar />
        <div className="h-full pt-27">
          <HeroSection />
        </div>
      </section>

      {/* Rest of Page */}
      <main>
        <div className="mt-32">
          <OurVision />
        </div>
        <div className="mt-32">
          <OurStrength />
        </div>
        <div className="my-32">
          <ServiceSection />
        </div>
      </main>
    </>
  );
}