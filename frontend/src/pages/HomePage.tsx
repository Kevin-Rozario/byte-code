import React from "react";
import HeroSection from "@/blocks/HeroSection";
import FeatureSection from "@/blocks/FeaturesSection";
import TestimonialsSection from "@/blocks/TestimonialsSection";
import Navbar from "@/components/Navbar/Navbar";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <hr />
      <HeroSection />
      <FeatureSection />
      <TestimonialsSection />
    </>
  );
};

export default HomePage;
