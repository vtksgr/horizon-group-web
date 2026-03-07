import HeroSection from "./sections/HeroSection";
import OurVision from "./sections/OurVision";
import OurStrength from "./sections/OurStrength";
import ServiceSection from "./sections/ServiceSection";
import CareerAcademy from "./sections/CareerAcademySection";
import ProgressSection from "./sections/ProgressSection";
import CurriculumSection from "./sections/CurriculumSection";
import ServiceFlow from "./sections/ServiceFlow";
import FaqSection from "./sections/FaqSection";


export default function Home() {
  return (
    <>
      {/* Fullscreen Hero Area */}
      <section className="h-[calc(100dvh-108px)] overflow-hidden">
        <div className="h-full">
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
        <div className="my-32">
          <CareerAcademy />
          <ProgressSection className="py-16" />
          <CurriculumSection className="py-16" />
        </div>
        <div className="my-32">
          <ServiceFlow />
        </div>
        <div className="my-32">
          <FaqSection />
        </div>
      </main>
    </>
  );
}

