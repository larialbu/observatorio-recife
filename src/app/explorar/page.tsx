"use client";

import "../styles/home/style.scss";
import "../styles/explore/style.scss";

import { ObsHeader } from "@/components/home/ObsHeader";
import { SocialIconsContainer } from "@/components/home/SocialIconsContainer";
import { Footer } from "@/components/home/Footer";
import { NavBarHome } from "@/components/home/NavBarHome";
import { CardsContainer } from "@/components/explorar/CardsContainer";
import { Head } from "next/document";

const Homepage = () => {
  
  <Head>
    {/* Favicon */}
    <link rel="icon" href="/favicon.ico" />
  </Head>

  return (
    
    <div className="min-h-screen">
      <ObsHeader></ObsHeader>

      <NavBarHome simple />

      <div className="p-8 text-5xl font-bold text-black text-p">
        <p>OBSERVATÓRIO<br/>ECONÔMICO DO RECIFE</p>
      </div>

      <div className="mt-10 mb-10">
        <CardsContainer></CardsContainer>
      </div>

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
