"use client";
import { Header } from "@/components/home/Header";
import "../styles/home/style.scss";
import { SocialIconsContainer } from "@/components/home/SocialIconsContainer";
import { Footer } from "@/components/home/Footer";
import { NavBarHome } from "@/components/home/NavBarHome";

const Homepage = () => {
  return (
    <div className="min-h-screen">
      <Header></Header>

      <NavBarHome simple />

      <div className="p-8 text-[36px] font-bold text-black">
        <p>OBSERVATÓRIO </p>
        <p>ECONÔMICO DE RECIFE </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
        <div className="flex justify-center items-center">
          <div className="rounded-lg w-[400px] h-20 bg-[url('/images/backgrounds/home_carousel/carousel_1.png')] bg-cover bg-center  "></div>
        </div>
      </div>

      <div className="h-screen"></div>
      {/* Carrossel */}
      {/* <Carousel></Carousel> */}

      {/* <ExploreSection></ExploreSection> */}

      {/* Cards Section */}
      {/* <CardsSection></CardsSection> */}

      <SocialIconsContainer />

      {/* Footer */}
      <Footer></Footer>
    </div>
  );
};

export default Homepage;
