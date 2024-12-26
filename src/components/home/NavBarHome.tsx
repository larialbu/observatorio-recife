import Link from "next/link";
import { useState, useEffect } from "react";
import React from 'react';

const Separator = () => {
  return <div className={`h-[20px] mx-[7px] sm:mx-2 w-[1px] bg-white`}></div>;
};
export const NavBarHome = ({ simple }: { simple?: boolean }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState('');

  const responsiveNavItem = `text-[13px] sm:text-[15px]`;

  const handleStatisticsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const navItems = [
    {
      text: 'Explorar',
      href: '/explorar',
      onClick: null,
      className: `${responsiveNavItem}`,
    },
    {
      text: 'Boletim Econômico',
      href: '/boletim-economico',
      onClick: null,
      className: `${responsiveNavItem} flex-shrink-0`,
    },
    {
      text: 'Estatísticas',
      href: '/observatorio/panorama',
      onClick: handleStatisticsClick,
      className: `${responsiveNavItem}`,
    },
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentRoute(window.location.pathname);
    }
  }, []);

  const displayedNavItems = currentRoute
    ? navItems.filter(item => currentRoute !== item.href)
    : navItems;

  return (
    // HÁ UM BREAKPOINT NOS ITEMS DA NAV EM 320PX DE LARGURA, TAL DINÂMICA PRECISA SER MELHORADA.
    <div
      className={`
        ${simple
        ? "bg-[url('/images/backgrounds/home_carousel/carousel_1.png')] bg-cover bg-center items-center"
        : ""
        } grid grid-cols-2 justify-between z-10 p-4 pr-2 sm:pr-4 pl-3 sm:pl-4 px-6 w-full`}
    >
      <Link href="/" className="w-fit">
        <img
          src="/images/logos/observatorio_logo.png"
          alt="logo observatorio"
          className={`${simple ? " h-10" : "text-left w-[45px] sm:w-20 mt-6 sm:mt-0"} object-cover`}
        />
      </Link >
      <ul className={`flex h-fit justify-end items-center text-white ${simple ? '': 'pt-0 sm:pt-2'}`}>
        {displayedNavItems.map((item, index) => (
          <React.Fragment key={item.href}>
            {index > 0 && <li><Separator /></li>}
            <li className={item.className}>
              {item.onClick ? (
                <a href={item.href} onClick={item.onClick}>
                  {item.text}
                </a>
              ) : (
                <Link href={item.href}>
                  {item.text}
                </Link>
              )}
            </li>
          </React.Fragment>
        ))}
        <Separator />
        <li className="">
          <div>
            <svg width="18px" height="100%" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g id="Dribbble-Light-Preview" transform="translate(-180.000000, -4199.000000)" fill="#ffffff">
                      <g id="icons" transform="translate(56.000000, 160.000000)">
                          <path d="M126,4049 C126,4044.589 129.589,4041 134,4041 L134,4057 C129.589,4057 126,4053.411 126,4049 M134,4039 C128.477,4039 124,4043.477 124,4049 C124,4054.523 128.477,4059 134,4059 C139.523,4059 144,4054.523 144,4049 C144,4043.477 139.523,4039 134,4039" id="contrast-[#907]"></path>
                      </g>
                  </g>
              </g>
            </svg>
          </div>
        </li>
      </ul>

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Bem-vindo(a)!
            </h2>
            <p className="text-gray-600 mb-6">
              Você está prestes a conferir as estatísticas do Observatório! Se preferir, passe primeiro pela seção "Explorar" para ter um panorama e entender melhor o que será abordado.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/observatorio/panorama">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                  Continuar para Estatísticas
                </button>
              </Link>
              <Link href="/explorar">
                <button className="px-4 h-full bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition">
                  Ir para Explorar
                </button>
              </Link>
            </div>
            <button
              onClick={closeModal}
              className="absolute top-5 right-6 text-white transform scale-[3]"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
