"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const Separator: React.FC = () => (
  <div className="h-[18px] sm:h-[20px] mx-[3px] w-[1px] sm:mx-[7px] bg-white" />
);

interface NavBarHomeProps {
  simple?: boolean;
}

export const NavBarHome: React.FC<NavBarHomeProps> = ({ simple }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currentRoute = usePathname(); 
  const menuRef = useRef<HTMLDivElement>(null);

  const baseNavItemClass = "text-[13px] sm:text-[15px]";

  function toggleDarkMode() {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  }

  const navItems = [
    { text: "Início", href: "/" },
    { text: "Explorar", href: "/explorar" },
    { text: "Fontes", href: "/fontes" },
    { text: "Equipe", href: "/equipe" },
    { text: "Sobre", href: "/sobre" },
    { text: "Ajuda", href: "/ajuda" },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function toggleMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  const containerClass = simple
    ? "bg-[url('/images/backgrounds/home_background2.avif')] bg-cover bg-center items-center"
    : "";

  return (
    <div
      className={`
        ${containerClass}
        grid grid-cols-2 sm:grid-cols-[auto_auto] z-10 p-4 pb-1 pr-2 sm:pr-4 pl-3 sm:pl-4 px-6 w-full relative
      `}
    >
      <div className="flex items-center gap-4 md:gap-10">
        <Link href="/" className="w-fit hover:rotate-45 transition-transform">
          <img
            src="/images/logos/observatorio_logo.png"
            alt="logo observatorio"
            className={simple ? "w-10" : "text-left min-w-[45px] sm:w-20"}
          />
        </Link>

        {currentRoute === "/" || currentRoute === "/observatorio/panorama" && (
          <div className="flex items-center gap-3 md:gap-6 min-[1024px]">
            <Link href="https://desenvolvimentoeconomico.recife.pe.gov.br/boletins-economicos" className="w-fit transition-transform flex justify-center items-center hover:scale-105" target="_blank">
              <img
                src="/images/logos/boletim-economico.png"
                alt="logo boletim economico"
                className="min-w-28 sm:w-32 md:w-44 lg:w-52"
              />
            </Link>

            <Link href="https://investerecife.recife.pe.gov.br/" className="w-fit transition-transform flex justify-center items-center hover:scale-105" target="_blank">
              <img
                src="/images/logos/investe-recife.png"
                alt="logo investe recife"
                className="min-w-20 sm:w-24 md:w-28 lg:w-36"
              />
            </Link>
          </div>
        )}
      </div>

      {
        currentRoute !== "/observatorio/panorama" && (<>
          <ul
            className={`hidden lg:flex h-fit justify-end items-center text-white ${
              simple ? "" : "pt-0 sm:pt-2"
            }`}
          >
            {navItems.map((item, index) => {
              const isActive = item.href === currentRoute;
              return (
                <React.Fragment key={item.href}>
                  {index > 0 && <li><Separator /></li>}
                  <li className={`${baseNavItemClass} ${isActive ? 'bg-white/20 py-[2px] px-[6px] rounded-full hover:bg-white/40' : 'hover:underline'}
            `}>
                    <Link href={item.href}>
                      {item.text}
                    </Link>
                  </li>
                </React.Fragment>
              );
            })}

            <Separator />
            <li>
              <div
                onClick={toggleDarkMode}
                className="cursor-pointer flex items-center space-x-2 pl-[2px]"
              >
                <svg
                  className={`w-5 h-5 ${
                    isDarkMode ? "rotate-180" : "rotate-0"
                  } transition-transform duration-500`}
                  width="18px"
                  height="100%"
                  viewBox="0 0 20 20"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g
                    id="Page-1"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <g
                      id="Dribbble-Light-Preview"
                      transform="translate(-180.000000, -4199.000000)"
                      fill="currentColor"
                    >
                      <g id="icons" transform="translate(56.000000, 160.000000)">
                        <path d="M126,4049 C126,4044.589 129.589,4041 134,4041 L134,4057 C129.589,4057 126,4053.411 126,4049 M134,4039 C128.477,4039 124,4043.477 124,4049 C124,4054.523 128.477,4059 134,4059 C139.523,4059 144,4054.523 144,4049 C144,4043.477 139.523,4039 134,4039" />
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
            </li>
          </ul>

          <div className="lg:hidden flex items-center justify-end relative -z-10">
            <button
              onClick={toggleMenu}
              className="text-white rounded hover:bg-gray-700 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>

          {isMenuOpen && (
            <div
              ref={menuRef}
              className="absolute top-14 right-0 bg-[#27384b] dark:bg-[#1E293B] text-white rounded-lg shadow-lg p-4 z-20"
            >
              <ul className="flex flex-col space-y-2">
                {navItems.map((item) => {
                  const isActive = item.href === currentRoute;
                  return (
                    <li key={item.href} className={`${isActive ? 'font-bold underline' : ''} hover:underline`}>
                        <Link href={item.href}>{item.text}</Link>
                        <hr className="opacity-30 mt-2 border-black" />
                      </li>
                  )
                })}

                <li>
                <div
                    onClick={toggleDarkMode}
                    className="cursor-pointer flex items-center space-x-2"
                  >
                    <svg
                      className={`w-5 h-5 ${
                        isDarkMode ? "rotate-180" : "rotate-0"
                      } transition-transform duration-500`}
                      width="18px"
                      height="100%"
                      viewBox="0 0 20 20"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g id="Dribbble-Light-Preview" transform="translate(-180.000000, -4199.000000)" fill="currentColor">
                          <g id="icons" transform="translate(56.000000, 160.000000)">
                            <path d="M126,4049 C126,4044.589 129.589,4041 134,4041 L134,4057 C129.589,4057 126,4053.411 126,4049 M134,4039 C128.477,4039 124,4043.477 124,4049 C124,4054.523 128.477,4059 134,4059 C139.523,4059 144,4054.523 144,4049 C144,4043.477 139.523,4039 134,4039" id="contrast-[#907]"></path>
                          </g>
                        </g>
                      </g>
                    </svg>
                    <span className="text-md">
                      {isDarkMode ? "Modo Claro" : "Modo Escuro"}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          )}
        </>)
      }

    </div>
  );
};
