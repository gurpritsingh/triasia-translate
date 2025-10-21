import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import LanguagesSection from "@/components/LanguagesSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import TranslatorTemplate from "@/components/TranslatorTemplate/TranslatorTemplate";
import data from '@/data/korean';

const Korean = () => {
  return (
    <TranslatorTemplate data={data}/>
  );
};

export default Korean;
