"use client";

import Image from "next/image";
import Link from "next/link";
import Menu from "./Menu";
import { useState, useRef, useCallback } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

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
          src={menuOpen ? "/observatorio.jpg" : "/images/logos/observatorio_logo.png"}
          alt="logo"
          width={menuOpen ? 150 : 35}
          height={32}
          className={menuOpen ? "" : "hover:rotate-45"}
        />
      </Link>
      <Menu open={menuOpen} />
    </div>
  );
};

export const Sidebar = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const isMobile = useIsMobile();

  // ESTADOS PARA DRAG DA BOLA (BOTÃO FLUTUANTE)
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // diferença entre clique e posição
  const [pos, setPos] = useState({ x: 16, y: 56 }); // posição inicial (left=16px, top=56px)

  // HANDLERS
  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!isMobile) return; // só arrasta em mobile

    setDragging(true);
    // Permite continuar recebendo eventos do pointer mesmo se sair do alvo
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    // offset (clicado - pos atual)
    setOffset({
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    });
  };

  const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!isMobile || !dragging) return;

    const newX = e.clientX - offset.x;
    const newY = e.clientY - offset.y;
    setPos({ x: newX, y: newY });
  };

  const onPointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!isMobile) return;
    setDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  return (
    <>
      {/* Botão flutuante pro celular (arrastável) */}
      {!menuOpen && isMobile && (
        <button
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onClick={() => setMenuOpen(true)}
          className="p-3 bg-blue-500 text-white rounded-full shadow-lg z-50"
          style={{
            position: "fixed",
            left: pos.x,
            top: pos.y,
            touchAction: "none", // permite arrastar sem scroll
          }}
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
