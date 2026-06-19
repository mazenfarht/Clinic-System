import AboutSection from "./components/AboutSection";
import AchievementsSection from "./components/AchievementsSection";
import ContactSection from "./components/ContactSection";
import DoctorSection from "./components/DoctorSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import TestimonialsSection from "./components/TestimonialsSection";
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
