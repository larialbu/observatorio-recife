import Link from "next/link";
import { useState, useEffect } from "react";
import React from "react";

const Separator = () => {
  return <div className={`h-[18px] sm:h-[20px] mx-[3px] w-[1px] sm:mx-[7px] bg-white`}></div>;
};

export const NavBarHome = ({ simple }: { simple?: boolean }) => {
  const [isDarkMode, setIsDarkMode] = useState(false); // Estado para o modo escuro
  const [currentRoute, setCurrentRoute] = useState("");

  const responsiveNavItem = `text-[13px] sm:text-[15px]`;

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode); // Alterna o estado do modo escuro
    document.documentElement.classList.toggle("dark"); // Alterna a classe 'dark' no elemento <html>
  };

  const navItems = [
    {
      text: "Panorama",
      href: "#",
      onClick: null,
      className: `${responsiveNavItem} px-[10px] py-[2px] bg-[#ec6625] rounded-full font-medium hover:bg-[#ce5a21] hover:scale-105`,
    },
    {
      text: "Explorar",
      href: "/explorar",
      onClick: null,
      className: `${responsiveNavItem} hover:underline`,
    },
    {
      text: "Boletim Econômico",
      href: "/boletim-economico",
      onClick: null,
      className: `${responsiveNavItem} flex-shrink-0 hover:underline`,
    },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentRoute(window.location.pathname);
    }
  }, []);

  const displayedNavItems = currentRoute
    ? navItems.filter((item) => currentRoute !== item.href)
    : navItems;

  return (
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
          className={`${
            simple ? " h-10" : "text-left w-[45px] sm:w-20 mt-[-7px]"
          } object-cover`}
        />
      </Link>
      <ul
        className={`flex h-fit justify-end items-center text-white mr-[10px] ${
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
        <li>
          {/* Ícone para alternar o modo escuro */}
          <div onClick={toggleDarkMode} className="cursor-pointer pl-[2px]">
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
          </div>
        </li>
      </ul>
    </div>
  );
};
