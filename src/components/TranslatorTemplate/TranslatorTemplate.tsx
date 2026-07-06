import { Heading } from "lucide-react";
import Footer from "../Footer";
import Header from "../Header";
import ServicesSection from "../ServicesSection";

const TranslatorTemplate = ({ data }) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ServicesSection heading={data.heading} subHeading={data.subHeading} headingLevel="h1"/>
      <Footer />
    </div>
  );
};

export default TranslatorTemplate;
