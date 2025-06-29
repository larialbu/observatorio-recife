"use client";

import React, { useState, useEffect } from "react";

const ToggleDarkMode: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // verifica preferência do sistema ou do localStorage ao carregar
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    // const prefersDark =
    //   window.matchMedia("(prefers-color-scheme: dark)").matches;

    const shouldEnableDark =
      savedTheme === "dark" || false;

    if (shouldEnableDark) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <div 
      className="fixed bottom-36 right-4 z-50 cursor-pointer" 
      onClick={toggleDarkMode} 
      aria-label={isDarkMode ? "Mudar para modo claro" : "Mudar para modo escuro"} 
      tabIndex={0} 
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") toggleDarkMode();
        }}
    >
        <div className="flex items-center justify-center bg-blue-500 text-white w-12 aspect-square rounded-full shadow-lg hover:bg-blue-600 transition-all">
            <div
            onClick={toggleDarkMode}
            className="cursor-pointer flex items-center space-x-2 pl-[2px]"
            role="button"
            aria-label={isDarkMode ? "Mudar para modo claro" : "Mudar para modo escuro"}
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") toggleDarkMode();
            }}
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
        </div>
    </div>
  );
};

export default ToggleDarkMode;