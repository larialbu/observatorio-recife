"use client";

import { useEffect, useState } from "react";
import AttendanceChart from "@/components/AttendanceChart";
import CountChart from "@/components/CountChart";
import FinanceChart from "@/components/FinanceChart";

const carouselTexts = [
  "Bem-vindo ao Panorama de Recife! Aqui você encontra dados sobre o movimento nos aeroportos, acesso a serviços públicos e tendências de crescimento econômico.",
  "Monitoramento em Tempo Real: Dados atualizados sobre o fluxo de passageiros e logística nos aeroportos da cidade.",
  "Desempenho Econômico: Acompanhe as taxas de emprego, variação do IPCA, e taxa Selic como indicadores do crescimento econômico.",
  "Posição Competitiva: Conheça o ranking de competitividade e as oportunidades de investimentos em Recife.",
  "Balança Comercial: Visualize os principais produtos de exportação e importação e seu impacto na economia local."
];

const AdminPage = () => {
  return (
    <div className="p-4 flex flex-col gap-8">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Panorama de Recife</h1>
        <p className="text-gray-600">Visão geral das métricas principais</p>
      </div>

      {/* Carousel Card */}
      <div className="relative h-[60px] bg-dark-blue text-white rounded-md shadow-md overflow-hidden mb-4">
        <div className="carousel">
          <div className="carousel-inner">
            {carouselTexts.map((text, index) => (
              <p key={index} className="carousel-item text-lg font-light">
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* FIRST ROW OF CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="h-[450px]">
          <CountChart title="Movimentação Aeroportos" />
        </div>
        <div className="h-[450px]">
          <AttendanceChart title="Recife" />
        </div>
        <div className="h-[450px]">
          <FinanceChart title="Empresas" />
        </div>
        <div className="h-[450px]">
          <CountChart title="Taxa Selic" />
        </div>
      </div>

      {/* SECOND ROW OF CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="h-[450px]">
          <AttendanceChart title="Balança Comercial" />
        </div>
        <div className="h-[450px]">
          <FinanceChart title="Movimentação de Empregos" />
        </div>
        <div className="h-[450px]">
          <CountChart title="IPCA" />
        </div>
        <div className="h-[450px]">
          <AttendanceChart title="Ranking Competitividade" />
        </div>
      </div>

      <style jsx>{`
        .bg-dark-blue {
          background-color: #0155ae; 
        }

        .carousel {
          overflow: hidden;
          position: relative;
          width: 100%;
          height: 60px; 
        }

        .carousel-inner {
          display: flex;
          animation: scroll 60s linear infinite; 
          white-space: nowrap; 
        }

        .carousel-item {
          display: inline-block;
          padding: 0 50px; 
          font-size: 1.2rem; 
          color: white; 
          align-self: center; 
          line-height: 60px; 
        }

        @keyframes scroll {
          0% {
            transform: translateX(100%); 
          }
          100% {
            transform: translateX(-${carouselTexts.length * 100}%); 
          }
        }
      `}</style>
    </div>
  );
};

export default AdminPage;
