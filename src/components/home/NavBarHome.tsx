"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

/** Componente simples para separar itens. */
const Separator: React.FC = () => (
  <div className="h-[18px] sm:h-[20px] mx-[3px] w-[1px] sm:mx-[7px] bg-white" />
);

interface NavBarHomeProps {
  simple?: boolean;
}

export const NavBarHome: React.FC<NavBarHomeProps> = ({ simple }) => {
  // Estados
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentRoute, setCurrentRoute] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Referência para fechar menu ao clicar fora
  const menuRef = useRef<HTMLDivElement>(null);

  // Classe base para itens de navegação
  const baseNavItemClass = "text-[13px] sm:text-[15px]";

  // Alterna Modo Escuro/Claro
  function toggleDarkMode() {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  }

  // Lista de itens do menu
  const navItems = [
    {
      text: "Panorama",
      href: "#",
      onClick: undefined,
      className: `${baseNavItemClass} px-[10px] py-[2px] bg-[#ec6625] rounded-full font-medium hover:bg-[#ce5a21] hover:scale-105`,
    },
    {
      text: "Explorar",
      href: "/explorar",
      onClick: undefined,
      className: `${baseNavItemClass} hover:underline`,
    },
    {
      text: "Boletim Econômico",
      href: "/boletim-economico",
      onClick: undefined,
      className: `${baseNavItemClass} flex-shrink-0 hover:underline`,
    },
    {
      text: "Fontes",
      href: "/fontes",
      onClick: undefined,
      className: `${baseNavItemClass} flex-shrink-0 hover:underline`,
    },
    {
      text: "Equipe",
      href: "/equipe",
      onClick: undefined,
      className: `${baseNavItemClass} flex-shrink-0 hover:underline`,
    },
    {
      text: "Sobre",
      href: "/sobre",
      onClick: undefined,
      className: `${baseNavItemClass} flex-shrink-0 hover:underline`,
    },
  ];

  /** Fechar menu ao clicar fora */
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentRoute(window.location.pathname);
    }

    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Itens a exibir (exclui o item se 'currentRoute' bate com 'href')
  const displayedNavItems = currentRoute
    ? navItems.filter((item) => item.href !== currentRoute)
    : navItems;

  // Toggle para menu mobile
  function toggleMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  // Classes extras se "simple" for true
  const containerClass = simple
    ? "bg-[url('/images/backgrounds/home_carousel/goodJesusStreet.png')] bg-cover bg-center items-center"
    : "";

  return (
    <div
      className={`
        ${containerClass}
        grid grid-cols-2 sm:grid-cols-[auto_auto] justify-between z-10 p-4 pr-2 sm:pr-4 pl-3 sm:pl-4 px-6 w-full
      `}
    >
      {/* LOGO */}
      <Link href="/" className="w-fit hover:rotate-45 transition-transform">
        <img
          src="/images/logos/observatorio_logo.png"
          alt="logo observatorio"
          className={simple ? "h-10" : "text-left w-[45px] sm:w-20"}
        />
      </Link>

      {/* Menu Desktop */}
      <ul
        className={`hidden sm:flex h-fit justify-end items-center text-white ${
          simple ? "" : "pt-0 sm:pt-2"
        }`}
      >
        {displayedNavItems.map((item, index) => (
          <React.Fragment key={item.href}>
            {index > 0 && <li><Separator /></li>}
            <li className={item.className}>
              {item.onClick ? (
                <a href={item.href} onClick={item.onClick}>
                  {item.text}
                </a>
              ) : (
                <Link href={item.href}>{item.text}</Link>
              )}
            </li>
          </React.Fragment>
        ))}

        <Separator />
        {/* Dark Mode Button */}
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

      {/* Menu Mobile */}
      <div className="sm:hidden flex items-center justify-end">
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

      {/* Dropdown Mobile */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute top-14 right-0 bg-[#27384b] dark:bg-[#1E293B] text-white rounded-lg shadow-lg p-4 z-20"
        >
          <ul className="flex flex-col space-y-2">
            {displayedNavItems.map((item) => (
              <li key={item.href} className="hover:underline">
                <Link href={item.href}>{item.text}</Link>
                <hr className="opacity-30 mt-2 border-black" />
              </li>
            ))}

            {/* Exemplo de item extra no menu mobile */}
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
    </div>
  );
};
