"use client";

import Image from "next/image";
import Link from "next/link";
import Menu from "./Menu";
import { useState } from "react";

const Bar = ({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean;
  setMenuOpen: (val: boolean) => void;
}) => {
  return (
    <div
      className={`${menuOpen ? "fixed z-20 shadow-2xl" : ""} w-[${
        menuOpen ? "14%" : "6%"
      }] p-3 bg-white h-full overflow-y-scroll`}
    >
      <div className={`flex ${menuOpen ? "justify-end" : "justify-center"} ${menuOpen ? "h-[40px]": ""}`}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex p-1 my-4 items-center justify-center  hover:bg-lamaSkyLight"
        >
          {menuOpen ? (
            <svg width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 12L8 12" stroke="#6b7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M11 8L7 12L11 16" stroke="#6b7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30px"
              height="30px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M4 12H20M4 8H20M4 16H12"
                stroke="#6b7280"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          )}
        </button>
      </div>

      <Link href="/" className="flex items-center justify-center">
        <Image
          src="/observatorio.jpg"
          alt="logo"
          width={menuOpen ? 150 : 35}
          height={32}
        />
      </Link>
      <Menu open={menuOpen} />
    </div>
  );
};

export const Sidebar = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <>
      {menuOpen ? (
        <>
          <Bar menuOpen={false} setMenuOpen={setMenuOpen} />
          <Bar menuOpen={true} setMenuOpen={setMenuOpen} />{" "}
        </>
      ) : (
        <Bar menuOpen={false} setMenuOpen={setMenuOpen} />
      )}
    </>
  );
};
