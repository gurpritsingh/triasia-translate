import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import LanguagesSection from "@/components/LanguagesSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { buildStaticSeo } from "@/content/seo";

const seo = buildStaticSeo({
  title: "TriasiaGlobal - Language Translation Services | 120+ Languages",
  description:
    "Leading translation services in India specializing in multiple languages. Professional document translation for legal, educational, medical, and business documents across 120+ languages.",
  path: "/",
});

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo {...seo} />
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

export default Index;
