"use client";

import React from 'react';
import Link from 'next/link';
import { Zenitho } from 'uvcanvas';

export default function StrategicPrograms() {
  const sdeLink = "https://desenvolvimentoeconomico.recife.pe.gov.br/";

  return (
    <div className='relative overflow-hidden'>
      <div className='absolute hue-rotate-[50deg] dark:opacity-50 dark:hue-rotate-[300deg]'>
        <Zenitho />
      </div>
      <section className="relative w-full overflow-hidden bg-transparent py-20 text-white dark:text-gray-800">
        <div className="container mx-auto px-4 z-10 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold">
              Iniciativas que Transformam
            </h2>
            
            <p className="mt-6 text-lg text-gray-300 dark:text-gray-600">
              A Secretaria de Desenvolvimento Econômico do Recife oferece um portfólio diversificado de programas estratégicos para impulsionar o crescimento, a qualificação profissional e o empreendedorismo na cidade.
            </p>
            <p className="mt-4 text-lg text-gray-300 dark:text-gray-600">
              Descubra como nossas ações estão moldando um futuro mais próspero e inovador para todos.
            </p>
          </div>
          
          
          <div className="text-center mt-12">
            <Link href={sdeLink} target="_blank" rel="noopener noreferrer">
              <button className="
                relative
                inline-flex items-center justify-center
                px-10 py-4
                text-lg font-bold text-white
                bg-gradient-to-r from-[#EC6625] to-[#FF8C00]
                rounded-full
                shadow-lg
                transform transition-all duration-300
                hover:scale-105 hover:shadow-2xl
                active:scale-95
                focus:outline-none focus:ring-4 focus:ring-[#EC6625]/50
                overflow-hidden group
              ">
                <span className="relative z-10">
                  Conheça Todos os Programas
                </span>
                <span className="
                  absolute -right-1/3 top-0 h-full w-full
                  bg-white opacity-10
                  transform skew-x-[-30deg]
                  group-hover:right-full transition-all duration-700
                "></span>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}