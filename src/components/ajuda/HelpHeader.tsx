"use client";

import React from "react";
import { Zenitho } from "uvcanvas";

export const HelpHeader: React.FC = () => {
    return (
        <section className="relative w-full min-h-[72vh] flex flex-col items-center justify-center text-white overflow-hidden">
            <div className="absolute inset-0">
                <div className="hue-rotate-[30deg] dark:hue-rotate-[200deg]"> 
                    <Zenitho />
                </div>
            </div>
            <div className="relative z-10 max-w-4xl text-center px-4">
                <div className="mb-6">
                    <h1 className="text-4xl md:text-5xl font-semibold mb-2 drop-shadow-md">Como podemos te ajudar?</h1>
                    <p className="lg:px-24">Explore nossa base de conhecimento para encontrar respostas simples e rápidas para as perguntas mais frequentes.</p>
                </div>
            <div className="relative">
                <input
                className="bg-white w-full rounded-md py-3.5 pl-10 text-gray-800 focus:outline-none hover:border-[#C5DFFF] focus:border-white focus:ring-1 focus:ring-[#C5DFFF]"
                placeholder="Qual a sua dúvida?"
                type="text"
                />
                <svg className="absolute left-3 top-[53%] -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l3.356 3.356a1 1 0 01-1.414 1.414l-3.356-3.356zM8 14a6 6 0 100-12 6 6 0 000 12z" clip-rule="evenodd"></path></svg>
            </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute -bottom-1">
            <path fill="#ffffff" className="dark:fill-[#0C1B2B] transition-all ease-out  duration-[290ms] dark:duration-[278ms]" fillOpacity="1" d="M0,160L120,186.7C240,213,480,267,720,261.3C960,256,1200,192,1320,160L1440,128L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path>
            </svg>
        </section>
    )
};
