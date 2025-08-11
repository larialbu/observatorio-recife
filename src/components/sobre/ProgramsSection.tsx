// src/components/sobre/CreativeProgramsCarousel.tsx

"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import { programsData } from './ProgramsData';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function CreativeProgramsCarousel() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0C1B2B] py-20 text-white">
      <style>{`
        .swiper-button-prev, .swiper-button-next {
          color: #fff !important;
          transition: transform 0.2s ease;
        }
        .swiper-button-prev:hover, .swiper-button-next:hover {
          transform: scale(1.2);
        }
        .swiper-pagination {
          position: relative !important;
          margin-top: 3rem !important;
        }
        .swiper-pagination-bullet {
          background: #ffffff80 !important;
          width: 20px !important;
          height: 5px !important;
          border-radius: 3px !important;
          transition: width 0.3s ease !important;
        }
        .swiper-pagination-bullet-active {
          background: #EC6625 !important;
          width: 30px !important;
        }
      `}</style>

      <div className="container mx-auto px-4 z-10 relative">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold">
            Programas Estratégicos
          </h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Explore as iniciativas que estão moldando o futuro econômico do Recife.
          </p>
        </div>
        
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={'auto'}
          loopAdditionalSlides={2}
          coverflowEffect={{
            rotate: 5,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="w-full py-4"
        >
          {/* MUDANÇA 1: Duplicando o array de dados para garantir um loop perfeito */}
          {[...programsData, ...programsData].map((program, index) => (
            <SwiperSlide key={`${program.name}-${index}`} className="!w-[280px] md:!w-[350px]">
              {({ isActive }) => (
                <div 
                  className={`
                    flex flex-col items-center text-center p-6 rounded-xl 
                    transition-all duration-500 min-h-[400px]
                    ${isActive ? 'bg-white/10 backdrop-blur-sm' : ''}
                  `}
                >
                  <div className={`flex-grow flex items-center justify-center transition-all duration-500 ease-in-out w-full ${isActive ? 'scale-100' : 'scale-75 opacity-60'}`}>
                    <img
                      src={program.logoUrl}
                      alt={`Logo ${program.name}`}
                      className="max-w-[160px] h-auto"
                    />
                  </div>
                  
                  <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isActive ? 'max-h-[200px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                    <h3 className={`font-bold text-xl mt-4 transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400'}`}>
                        {program.name}
                    </h3>
                    <p className="text-gray-300 text-sm mt-2">
                      {program.description}
                    </p>
                    <a 
                      href={program.href} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-[#EC6625] text-white font-bold py-2 px-5 rounded-full hover:bg-opacity-90 transition-all mt-4 text-sm"
                    >
                      Conheça o Programa
                    </a>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}