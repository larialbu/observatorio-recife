"use client";
import "./styles/home/style.scss";

import { Header } from "@/components/home/Header";
import { Carousel } from "@/components/home/Carousel";
import { ExploreSection } from "@/components/home/ExploreSection";
import { CardsSection } from "@/components/explore/CardsSection";
import { Footer } from "@/components/home/Footer";
import { SocialIconsContainer } from "@/components/home/SocialIconsContainer";

const Homepage = () => {
  return (
    <div className="min-h-screen">
      <Header></Header>

      {/* Carrossel */}
      <Carousel></Carousel>

      <ExploreSection></ExploreSection>

      {/* Cards Section */}
      <CardsSection></CardsSection>

      <SocialIconsContainer />

      {/* Footer */}
      <Footer></Footer>
    </div>
  );
};

export default Homepage;
