import AboutSection from "./components/Landing-Page/AboutSection";
import AchievementsSection from "./components/Landing-Page/AchievementsSection";
import ContactSection from "./components/Landing-Page/ContactSection";
import DoctorSection from "./components/Landing-Page/DoctorSection";
import Footer from "./components/Landing-Page/Footer";
import HeroSection from "./components/Landing-Page/HeroSection";
import Navbar from "./components/Landing-Page/Navbar";
import TestimonialsSection from "./components/Landing-Page/TestimonialsSection";
export default function Home() {
  return (
    <>
      <div dir="rtl" className="bg-[#F8FAFB] font-sans text-[#1A2B45]">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <DoctorSection />
        <AchievementsSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </div>
    </>
  );
}
