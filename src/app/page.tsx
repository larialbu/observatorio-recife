"use client";
import "./styles/home/style.scss";

import { Header } from "@/components/home/Header";
import { Carousel } from "@/components/home/Carousel";
import { ExploreSection } from "@/components/home/ExploreSection";
import { Footer } from "@/components/home/Footer";
import { SocialIconsContainer } from "@/components/home/SocialIconsContainer";
import { AboutSection } from "@/components/home/AboutSection";

const Homepage = () => {
  return (
    <div className="min-h-screen">
      <Header></Header>

      {/* Carrossel */}
      <Carousel></Carousel>

      <ExploreSection></ExploreSection>

      <AboutSection />

      <SocialIconsContainer />

      {/* Footer */}
      <Footer></Footer>
    </div>
  );
};

export default Homepage;
