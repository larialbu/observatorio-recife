import { useEffect, useState } from "react";

export const AboutSection = () => {
  const [imgDirect, setImgDirect] = useState<string>(
    "/images/about/about-1.png"
  );
  const [isFading, setIsFading] = useState<boolean>(false);

  useEffect(() => {
    const images = [
      "/images/about/about-1.png",
      "/images/about/about-2.png",
      "/images/about/about-3.png",
    ];

    let index = 0;

    const interval = setInterval(() => {
      setIsFading(true); // Ativa o fade-in antes de trocar a imagem

      setTimeout(() => {
        index = (index + 1) % images.length;
        setImgDirect(images[index]);
        setIsFading(false); // Desativa o fade-in após a troca
      }, 500); // Define a duração do fade-in antes de trocar a imagem
    }, 10000);

    return () => clearInterval(interval); // Limpa o intervalo quando o componente desmonta
  }, []);

  return (
    <div className="relative py-12 w-full flex flex-col mt-10 items-center justify-center text-end">
      <img
        src={imgDirect}
        className={`absolute w-full h-full bg-cover bg-center object-cover transition-opacity duration-1000 ${
          isFading ? "opacity-0" : "opacity-100"
        }`}
      />
      <div className="text-content w-[80%] max-w-[800px] p-4 flex items-end justify-end">
        <div className="sm:w-[70%] w-[100%]   z-20">
          <div className="title-content">
            <div className="text-2xl sm:text-3xl mb-3 font-bold __title">
              <p>Sobre nós</p>
            </div>
            <div className="description-content">
              <div className="__description">
                <p className="text-end text-[14px] sm:text-[16px]">
                  O Observatório Econômico do Recife é uma iniciativa da
                  Prefeitura do Recife, em parceria com a Faculdade Senac, que
                  visa oferecer uma análise detalhada do panorama econômico da
                  cidade.
                </p>
              </div>
            </div>

            <div className="text-2xl sm:text-3xl mt-8 mb-3 font-bold __title">
              <p>Nossa visão</p>
            </div>
            <div className="description-content">
              <div className="__description">
                <p className="text-end text-[14px] sm:text-[16px]">
                  A plataforma reúne dados econômicos abertos e fornece insights
                  valiosos para governantes, investidores, estudantes e o
                  público em geral, facilitando a compreensão e acompanhamento
                  do desenvolvimento econômico local.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
