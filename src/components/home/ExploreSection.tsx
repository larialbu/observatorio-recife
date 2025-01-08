import React, { useState, useEffect } from "react";
import { iconsExplore } from "./ExploreIconsObservatorio";
import { ExploreDiv } from "./ExploreDiv";
import Link from "next/link";

export const ExploreSection = () => {

  return (
    <div className="w-full flex flex-col mt-[5em] items-center explore-content section-content">
      <div className="text-2xl sm:text-3xl lg:text-4xl lg:pr-[40%] mb-3 font-bold __title dark:text-white">
        <p>Resultados para consulta:</p>
      </div>
      <ExploreDiv/>

      <div className="mt-40">
        <Link href={"/explorar"}>
            <button className="lg:text-[18px] font-bold text-white drop-shadow-xl rounded-full bg-[#EC6625] py-4 px-20 hover:bg-[#ce5a21] hover:scale-105 hover:drop-shadow-2xl transition duration-200 sm:hover:scale-85">
              Explorar
            </button>
        </Link>
      </div>
    </div>
  );
};
