"use client";

import Image from "next/image";
import Link from "next/link";
import Menu from "./Menu";
import { useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile"; // Hook para detectar visualização mobile

const Bar = ({
  menuOpen,
  isMobile,
  setMenuOpen,
}: {
  menuOpen: boolean;
  isMobile: boolean;
  setMenuOpen: (val: boolean) => void;
}) => {
  return (
    <div
      className={`
        ${menuOpen ? "fixed min-w-[200px] z-50 shadow-2xl overflow-y-scroll" : ""} 
        ${isMobile && !menuOpen ? "hidden" : `w-[${menuOpen ? "14%" : "6%"}]`}
        p-3 bg-white h-full transition-all duration-300
      `}
    >
      <div
        className={`flex ${menuOpen ? "justify-end" : "justify-center"} ${
          menuOpen ? "h-[40px]" : ""
        }`}
      >
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex p-1 my-4 items-center justify-center hover:bg-lamaSkyLight"
        >
          {menuOpen ? (
            <svg
              width="35px"
              height="35px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17 12L8 12" stroke="#6b7280" />
              <path d="M11 8L7 12L11 16" stroke="#6b7280" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30px"
              height="30px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path d="M4 12H20M4 8H20M4 16H12" stroke="#6b7280" />
            </svg>
          )}
        </button>
      </div>

      <Link href="/" className="flex items-center justify-center">
        <Image
          src={menuOpen ? "/observatorio.jpg" : "/images/logos/observatorio_logo.png"} // Alteração aqui
          alt="logo"
          width={menuOpen ? 150 : 35} // Tamanho baseado no estado do menu
          height={32}
        />
      </Link>
      <Menu open={menuOpen} />
    </div>
  );
};

export const Sidebar = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const isMobile = useIsMobile();

  return (
    <>
      {/* Botão flutuante pro celular */}
      {!menuOpen && isMobile && (
        <button
          onClick={() => setMenuOpen(true)}
          className="fixed top-14 left-4 p-3 bg-blue-500 text-white rounded-full shadow-lg z-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16M4 6h16M4 18h8" />
          </svg>
        </button>
      )}
      <Bar menuOpen={menuOpen} isMobile={isMobile} setMenuOpen={setMenuOpen} />
    </>
  );
};
