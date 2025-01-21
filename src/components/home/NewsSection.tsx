"use client";

import React, { useState, useEffect } from "react";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  link: string;
}

const newsData: NewsItem[] = [
  {
    id: 1,
    title: "Recife é a capital do Nordeste mais favorável à abertura de novos negócios",
    description:
      "Recife lidera no Nordeste na facilidade para abrir negócios, com quase 800 atividades isentas de licenças, impulsionando economia e investimentos.",
    image: "/images/news/news1.png",
    date: "--",
    link: "https://desenvolvimentoeconomico.recife.pe.gov.br/negocios-20",
  },
  {
    id: 2,
    title: "FIEPE reforça Programa de Internacionalização para pequenos negócios em 2025",
    description:
      "O programa de Internacionalização da FIEPE, em parceria com o SEBRAE, será reforçado em 2025 para capacitar pequenas empresas de Pernambuco a competir no mercado internacional.",
    image: "/images/news/news3.png",
    date: "11 de Janeiro de 2025",
    link: "https://www.cbnrecife.com/artigo/fiepe-reforca-programa-de-internacionalizacao-para-pequenos-negocios-em-2025",
  },
  {
    id: 3,
    title: "Recife dispara como a capital com mais estudantes em Tecnologia do Brasil",
    description:
      "Recife lidera no Brasil em estudantes de TI por habitante, impulsionado pelo programa Embarque Digital, parceria entre o Porto Digital e a Prefeitura, promovendo qualificação e inovação tecnológica.",
    image: "/images/news/news2.jpg",
    date: "8 de Janeiro de 2025",
    link: "https://jornaldigital.recife.br/2025/01/08/recife-dispara-como-a-capital-com-mais-estudantes-de-ti-do-brasil/",
  },
  {
    id: 4,
    title: "Porto Digital estima ser o 2º maior serviço no Recife em 2025",
    description:
      "O Porto Digital, maior parque tecnológico urbano da América Latina, projeta ultrapassar o setor de construção civil até 2025, consolidando-se como o 2º maior em receita no Recife, com faturamento que já triplicou desde 2018.",
    image: "/images/news/news4.jpg",
    date: "18 de Maio de 2025",
    link: "https://www.poder360.com.br/poder-tech/porto-digital-estima-ser-o-2o-maior-servico-no-recife-em-2025/",
  },
  {
    id: 5,
    title: "Pesquisa põe Recife em lista das 156 cidades mais promissoras do mundo",
    description:
      "Recife está entre as cidades mais promissoras do mundo, segundo pesquisa da Global Cities Report, da consultoria internacional Kearney, referente ao ano de 2023 e anunciada este mês.",
    image: "/images/news/news5.jpg",
    date: "19 de Janeiro de 2024",
    link: "https://jornaldigital.recife.br/2024/01/19/pesquisa-poe-recife-em-lista-das-156-cidades-mais-promissoras-do-mundo/",
  },
];

function NewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    const updateSlidesToShow = () => {
      if (window.innerWidth < 640) setSlidesToShow(1);
      else if (window.innerWidth < 1024) setSlidesToShow(2);
      else setSlidesToShow(3);
    };
    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? newsData.length - slidesToShow : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 > newsData.length - slidesToShow ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative bg-gradient-to-b from-blue-50 to-blue-100 dark:from-[#27384b] dark:to-[#0C1B2B] py-12 px-6 mt-16">
      <div className="max-w-7xl mx-auto relative">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Últimas Notícias
        </h2>

        <div className="relative flex items-center">
          {/* Botão Anterior */}
          <button
            onClick={handlePrev}
            className="absolute left-0 ml-[-23px] z-10 p-4 text-white bg-[#0155AE] dark:bg-[#EC6625] rounded-full shadow-md hover:bg-[#144880] dark:hover:bg-[#cc6633] transition-transform transform hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Slides */}
          <div className="overflow-hidden w-full">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${(100 / slidesToShow) * currentIndex}%)`,
              }}
            >
              {newsData.map((news) => (
                <div
                  key={news.id}
                  className="flex-shrink-0 w-[calc(100%/3)] px-4"
                  style={{ width: `${100 / slidesToShow}%` }}
                >
                  <div
                    onClick={() => window.open(news.link, "_blank")}
                    className="flex flex-col h-full bg-white dark:bg-[#142b42] shadow-lg rounded-lg overflow-hidden"
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-48 object-cover object-top"
                    />
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        {news.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-[3em] line-clamp-3">
                        {news.description}
                      </p>
                      <div className="absolute bottom-[3em] text-gray-500 dark:text-gray-400 text-xs mb-4">
                        {news.date}
                      </div>
                      <a
                        href={news.link}
                        className="text-[#0155AE] dark:text-[#EC6625] font-semibold hover:underline mt-auto"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Ler mais →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botão Próximo */}
          <button
            onClick={handleNext}
            className="absolute right-0 mr-[-23px] z-10 p-4 text-white bg-[#0155AE] dark:bg-[#EC6625] rounded-full shadow-md hover:bg-[#144880] dark:hover:bg-[#cc6633] transition-transform transform hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// Aqui o export default
export default NewsSection;
