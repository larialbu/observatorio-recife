"use client";

import "../styles/home/style.scss";
import "../styles/explore/style.scss";

import React, { useEffect, useState } from "react";
import { NavBarHome } from "@/components/home/NavBarHome";
import { Footer } from "@/components/home/Footer";
import { ObsHeader } from "@/components/home/ObsHeader";
import { SocialIconsContainer } from "@/components/home/SocialIconsContainer";
import Timeline from "@/components/sobre/Timeline";
import { FaqSection } from "@/components/sobre/FaqSection";
import { MissionSection } from "@/components/sobre/MissionSection";

const SobreNos: React.FC = () => {
  const [currentImage, setCurrentImage] = useState<string>("/images/about/about-1.png");
  const [transitionClass, setTransitionClass] = useState<string>("");

  useEffect(() => {
    const images = [
      "/images/about/about-1.png",
      "/images/about/about-2.png",
      "/images/about/about-3.png",
    ];

    let index = 0;
    const interval = setInterval(() => {
      setTransitionClass("fade-out");

      setTimeout(() => {
        index = (index + 1) % images.length;
        setCurrentImage(images[index]);
        setTransitionClass("fade-in");
      }, 600);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const renderCard = (title: string, description: string, icon: React.ReactNode) => (
    <div className="group bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-6 hover:shadow-2xl transform hover:-translate-y-3 transition duration-300">
      <div className="flex items-center space-x-4 mb-4">
        <div className="bg-blue-100 dark:bg-gray-800 p-4 rounded-full">
          {icon}
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h2>
      </div>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );

  return (
    <>
      <ObsHeader />
      <NavBarHome simple />

      <section className="py-16 px-6 w-full flex flex-col items-center dark:bg-[#0C1B2B]">
        <div className="mb-14 text-center flex flex-col items-center">
          <div className="w-20 flex hover:rotate-45 transition-transform">
            <img
              src="/images/logos/observatorio_logo.png"
              alt="Logo Observatorio"
            />
          </div>
          <h1 className="text-5xl font-extrabold text-gray-800 dark:text-white">
            Sobre Nós
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Descubra mais sobre o Observatório Econômico do Recife e nossa missão
            de inovação.
          </p>
        </div>
        <MissionSection />
      </section>

      <Timeline></Timeline>

      <FaqSection />

      <SocialIconsContainer />
      <Footer />
    </>
  );
};

export default SobreNos;
