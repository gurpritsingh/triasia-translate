import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import LanguagesSection from "@/components/LanguagesSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Korean = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ServicesSection />
      <LanguagesSection />
      <WhyChooseUsSection />
      {/* <ContactSection /> */}
      <Footer />
    </div>
  );
};

export default Korean;
