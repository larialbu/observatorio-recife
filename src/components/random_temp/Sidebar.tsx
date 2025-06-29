"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

import { useIsMobile } from "@/hooks/useIsMobile";

import Menu from "./Menu";

export const ArrowIcon = () => {
  return (            <svg
    width="35px"
    height="35px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="stroke-[#6b7280] dark:stroke-[#e5e7eb]"
  >
    <path d="M17 12L8 12" />
    <path d="M11 8L7 12L11 16" />
  </svg>)
}

const Bar = ({
  menuOpen,
  isMobile,
  setMenuOpen,
}: {
  menuOpen: boolean;
  isMobile: boolean;
  setMenuOpen: (val: boolean) => void;
}) => {
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobile &&
        menuOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen, setMenuOpen, isMobile]);

  return (
    <div
      ref={sidebarRef}
      className={`
        ${menuOpen ? "fixed min-w-[200px] z-50 shadow-2xl overflow-y-scroll" : ""}
        ${isMobile && !menuOpen ? "hidden" : `w-[${menuOpen ? "14%" : "6%"}]`}
        p-3 bg-white dark:bg-[#0C1B2B] h-full transition-all duration-300
      `}
    >
      <div
        className={`flex ${menuOpen ? "justify-end" : "justify-center"} ${
          menuOpen ? "h-[40px]" : ""
        }`}
      >
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex p-1 my-4 items-center justify-center hover:bg-lamaSkyLight dark:hover:bg-[#15273b] rounded-full"
        >
          {menuOpen ? (
            <ArrowIcon />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30px"
              height="30px"
              viewBox="0 0 24 24"
              fill="none"
              className="stroke-[#6b7280] dark:stroke-white"
            >
              <path d="M4 12H20M4 8H20M4 16H12" />
            </svg>
          )}
        </button>
      </div>

      <Link href="/" className="flex items-center justify-center flex-col">
        <Image
          src="/images/logos/logo-obs-economico.svg"
          alt="logo"
          width={menuOpen ? 100 : 35}
          height={32}
          className={menuOpen ? "" : "hover:rotate-45"}
        />
        {menuOpen && (
          <span className="text-center text-[#2976C0] dark:text-gray-200 font-medium -mt-2 leading-4">
            Observatório <br />
            Econômico <br />
            do Recife
          </span>
        )}
      </Link>
      <Menu open={menuOpen} />
    </div>
  );
};

export const Sidebar = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const isMobile = useIsMobile();

  // Estados para o botão flutuante arrastável
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [pos, setPos] = useState({ x: 16, y: 56 });
  const [showTooltip, setShowTooltip] = useState(true);
  const [tooltipVisible, setTooltipVisible] = useState(true);

  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!isMobile) return;

    setDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setOffset({ x: e.clientX - pos.x, y: e.clientY - pos.y });
    setShowTooltip(false);
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

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showTooltip) {
      const timeout = setTimeout(() => setTooltipVisible(false), 500);
      return () => clearTimeout(timeout);
    }
    setTooltipVisible(true);
  }, [showTooltip]);

  return (
    <>
      {!menuOpen && isMobile && (
        <>
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
              touchAction: "none",
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

          {tooltipVisible && (
            <div
              className={`absolute bg-blue-500 text-white text-sm rounded-lg p-2 shadow-md z-50
              transition-all duration-500 ease-in-out transform ${
                showTooltip ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
              }`}
              style={{
                left: pos.x + 50,
                top: pos.y - 10,
              }}
            >
              Arraste o botão para posicioná-lo!
            </div>
          )}
        </>
      )}

      <Bar menuOpen={menuOpen} isMobile={isMobile} setMenuOpen={setMenuOpen} />
    </>
  );
};