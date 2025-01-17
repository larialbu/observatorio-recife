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
        <div className="bg-blue-100 dark:bg-[#0C1B2B] p-4 rounded-full">
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

      {/* Valores e Missão */}
      <section className="py-16 px-6 w-full flex flex-col items-center dark:bg-[#0C1B2B]">
      <div className="mb-14 text-center">
        <h1 className="text-5xl font-extrabold text-gray-800 dark:text-white">Sobre Nós</h1>
          <p className="mt-4 text-lg  text-gray-600 dark:text-gray-400">
            Descubra mais sobre o Observatório Econômico do Recife e nossa missão de inovação.
          </p>
        </div>
        <div className="flex justify-center items-center max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {renderCard(
              "Sobre Nós",
              "O Observatório Econômico do Recife é uma iniciativa da Prefeitura do Recife, em parceria com a Faculdade Senac, que visa oferecer uma análise detalhada do panorama econômico da cidade. ",
              <svg className="w-8 h-8 fill-[#0155AE]" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 3a7 7 0 100 14 7 7 0 000-14zm-9 7a9 9 0 1118 0 9 9 0 01-18 0zm8-4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm.01 8a1 1 0 102 0V9a1 1 0 10-2 0v5z" />
              </svg>
            )}
            {renderCard(
              "Nossa Visão",
              "A plataforma reúne dados econômicos abertos e fornece insights valiosos para governantes, investidores, estudantes e o público em geral, facilitando a compreensão e acompanhamento do desenvolvimento econômico local.",
              <svg className="w-8 h-8 stroke-[#52B348]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 12c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 5c-4.478 0-8.268 2.943-9.543 7C3.732 16.057 7.522 19 12 19c4.478 0 8.268-2.943 9.543-7C20.268 7.943 16.478 5 12 5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            {renderCard(
              "Nossos Valores",
              "O Observatório Econômico do Recife preza pela transparência, inovação e sustentabilidade, promovendo dados confiáveis e colaboração para impulsionar o desenvolvimento inclusivo e responsável da cidade.",
              <svg
                className="w-8 h-8 fill-none stroke-[#EC6625] stroke-[1.91px]"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
            >
                <defs>
                </defs>
                <path
                className="cls-1"
                d="M6.27,22.5h7.57a4.77,4.77,0,0,0,3.38-1.4l4.71-4.71a2,2,0,0,0-2.86-2.87l-5.16,5.16H13a1.91,1.91,0,0,0,1.88-2.23,2,2,0,0,0-2-1.59H9.14l-.93-.46a4.66,4.66,0,0,0-5,.55A4.57,4.57,0,0,0,1.5,18.57v.11"
                />
                <line className="cls-1" x1="12.96" y1="18.68" x2="8.18" y2="18.68" />
                <circle className="cls-1" cx="12" cy="7.23" r="5.73" />
                <ellipse className="cls-1" cx="12" cy="7.23" rx="1.91" ry="5.73" />
                <line className="cls-1" x1="6.27" y1="7.23" x2="17.73" y2="7.23" />
            </svg>
            )}
          </div>
        </div>
      </section>

      <Timeline></Timeline>

      <FaqSection />

      <SocialIconsContainer />
      <Footer />
    </>
  );
};

export default SobreNos;
