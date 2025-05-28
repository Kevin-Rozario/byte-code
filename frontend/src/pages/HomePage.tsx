import HeroSection from "@/blocks/HeroSection";
import FeatureSection from "@/blocks/FeaturesSection";
import TestimonialsSection from "@/blocks/TestimonialsSection";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/blocks/Footer";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <hr />
      <HeroSection />
      <FeatureSection />
      <TestimonialsSection />
      <Footer />
    </>
  );
};

export default HomePage;
