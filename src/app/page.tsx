"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

const Homepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    "/recife.png", // Coloque o caminho correto da sua imagem na pasta public
    "/recife2.png", // Coloque o caminho correto da sua imagem na pasta public
    "/recife3.png", // Coloque o caminho correto da sua imagem na pasta public
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="bg-white text-blue-900 py-4 px-8 flex items-center">
        {/* Logo à esquerda */}
        <div className="flex items-center mr-4">
          <Image
            src="/logo-recife.png"
            alt="Prefeitura do Recife"
            width={100}
            height={50}
          />
        </div>
        {/* Texto à direita */}
        <div className="ml-auto text-lg font-semibold">Prefeitura do Recife</div>
      </nav>

      {/* Carrossel */}
      <div className="relative mt-4 h-96">
        <div className="overflow-hidden w-full h-full">
          <div
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {images.map((image, index) => (
              <div key={index} className="flex-shrink-0 w-full h-full">
                <img
                  src={image}
                  alt={`Imagem ${index + 1}`}
                  className="w-full h-full object-cover opacity-80" // Opacidade adicionada
                />
              </div>
            ))}
          </div>
        </div>

        {/* Setas */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white bg-gray-800/50 p-2"
        >
          {"<"}
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white bg-gray-800/50 p-2"
        >
          {">"}
        </button>

        {/* Indicadores */}
        <div className="absolute bottom-4 w-full flex justify-center">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full mx-2 ${index === currentSlide ? "bg-white" : "bg-gray-400"}`}
            />
          ))}
        </div>
      </div>

      {/* Cards Section */}
      <div className="flex flex-wrap justify-center mt-16 mb-16"> {/* Mudança para flex-wrap */}
        <Link href="/list/events">
          <div className="bg-white rounded-lg shadow-md p-4 m-2 flex flex-col items-center cursor-pointer w-80"> {/* Largura fixa e margem */}
            <Image src="/home.png" alt="Icon 1" width={50} height={50} />
            <h2 className="mt-2 font-semibold">Título do Card 1</h2>
            <p>Texto fictício para descrever o card 1.</p>
            <button className="mt-2 bg-blue-900 text-white rounded py-1 px-3">Ver mais</button> {/* Botão azul */}
          </div>
        </Link>
        <Link href="/list/events">
          <div className="bg-white rounded-lg shadow-md p-4 m-2 flex flex-col items-center cursor-pointer w-80"> {/* Largura fixa e margem */}
            <Image src="/calendar.png" alt="Icon 2" width={50} height={50} />
            <h2 className="mt-2 font-semibold">Título do Card 2</h2>
            <p>Texto fictício para descrever o card 2.</p>
            <button className="mt-2 bg-blue-900 text-white rounded py-1 px-3">Ver mais</button> {/* Botão azul */}
          </div>
        </Link>
        <Link href="/list/events">
          <div className="bg-white rounded-lg shadow-md p-4 m-2 flex flex-col items-center cursor-pointer w-80"> {/* Largura fixa e margem */}
            <Image src="/student.png" alt="Icon 3" width={50} height={50} />
            <h2 className="mt-2 font-semibold">Título do Card 3</h2>
            <p>Texto fictício para descrever o card 3.</p>
            <button className="mt-2 bg-blue-900 text-white rounded py-1 px-3">Ver mais</button> {/* Botão azul */}
          </div>
        </Link>
      </div>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-6 px-4 flex flex-col md:flex-row justify-between items-center"> {/* Azul e com padding */}
        <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
          <Image src="/logo-recife.png" alt="Prefeitura do Recife" width={100} height={50} />
          <h3 className="font-semibold">Secretaria de Desenvolvimento Econômico</h3>
          <p>+55 (81) 3355-7130/3355-7129</p>
          <p>desenvolvimento@recife.pe.gov.br</p>
          <p>www.desenvolvimentoeconomico.recife.pe.gov.br</p>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <p>Rua do Brum, 123 - 3o andar - Empresarial Maurício Brandão Mattos - Bairro do Recife, Recife-PE</p>
          <p>8h às 18h (Segunda a sexta-feira)</p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
