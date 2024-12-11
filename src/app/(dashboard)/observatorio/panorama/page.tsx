"use client";

import { useEffect, useState } from "react";
import AttendanceChart from "@/components/random_temp/AttendanceChart";
import CountChart from "@/components/random_temp/CountChart";
import FinanceChart from "@/components/random_temp/FinanceChart";
import { LoadingScreen } from "@/components/home/LoadingScreen";
import { useDashboard } from "@/context/DashboardContext";
import { getCompany } from "@/functions/process_data/observatorio/empresas/getCompaniesGroups";
import { getJobs } from "@/functions/process_data/observatorio/emprego/getJobs";
import { getSelic } from "@/functions/process_data/observatorio/selic/getSelic";
import { getIPCAAcc } from "@/functions/process_data/observatorio/ipca/getIPCAAcc";
import { getAirport } from "@/components/observatorio/panorama/functions/getAirport";
import { getPIB } from "@/functions/process_data/observatorio/pib/getPIB";
import { LineGraph } from "@/components/@global/charts/temp/panorama/LineGraph";
import { BarGraph } from "@/components/@global/charts/temp/panorama/BarGraph";
import { BarGraphHorizontal } from "@/components/@global/charts/temp/panorama/BarGraphHorizontal";
import PieChartColor from "@/components/@global/charts/temp/panorama/PieChart";
import {
  formatMonth1,
  formatMonth2,
} from "@/components/observatorio/panorama/functions/formatMonth";

import apiConfig from "@/config/apiConfig";

const carouselTexts = [
  "Bem-vindo ao Panorama de Recife! Aqui você encontra dados sobre o movimento nos aeroportos, acesso a serviços públicos e tendências de crescimento econômico.",
  "Monitoramento em Tempo Real: Dados atualizados sobre o fluxo de passageiros e logística nos aeroportos da cidade.",
  "Desempenho Econômico: Acompanhe as taxas de emprego, variação do IPCA, e taxa Selic como indicadores do crescimento econômico.",
  "Posição Competitiva: Conheça o ranking de competitividade e as oportunidades de investimentos em Recife.",
  "Balança Comercial: Visualize os principais produtos de exportação e importação e seu impacto na economia local.",
];

const PanoramaPage = () => {
  const { year, setAvailableYears } = useDashboard();
  const [months, setMonths] = useState<string>("setembro");
  const [loading, setLoading] = useState(false);

  const [airport, setAirport] = useState([]);
  const [muniPib, setMuniPib] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selic, setSelic] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [ipca, setIpca] = useState([]);

  // `http://localhost:3001/api/data/aeroporto/embarque-desembarque/2023_2024`
  //  `http://localhost:3001/api/data/aeroporto/${selectedYear}`

  // /api/data/pib/municipios/2010_2021
  // /api/data/empresas/recife/ativas/2020_2024
  // /api/data/selic/2021_2024

  // `http://localhost:3001/api/data/balanco-comercial/geral/2023_2024`;
  // /api/data/emprego/empregados/2021_2024
  // `http://localhost:3001/api/data/ipca/indice-geral/2023_2024`

  const fetchData = async (selectedYear: string) => {
    setLoading(true);
    try {
      const response1 = await fetch(
        `${apiConfig.baseURL}/ipca/indice-geral/2023_2024`
      );
      const json1 = await response1.json();

      const response2 = await fetch(`${apiConfig.baseURL}/aeroporto/2024`);
      const json2 = await response2.json();

      const response25 = await fetch(`${apiConfig.baseURL}/aeroporto/2023`);
      const json25 = await response25.json();

      const response3 = await fetch(
        `${apiConfig.baseURL}/pib/municipios/2010_2021`
      );
      const json3 = await response3.json();

      const response4 = await fetch(
        `${apiConfig.baseURL}/empresas/recife/ativas/2020_2024`
      );
      const json4 = await response4.json();

      const response5 = await fetch(`${apiConfig.baseURL}/selic/2021_2024`);
      const json5 = await response5.json();

      const response6 = await fetch(
        `${apiConfig.baseURL}/emprego/empregados/2021_2024`
      );
      const json6 = await response6.json();

      const ipcaData = getIPCAAcc(json1, year, "Recife");
      const airportData = getAirport(year === "2024" ? json2 : json25, year);
      const pibData = getPIB(json3, "2021");
      const companyData = getCompany(json4, year);
      const selicData = getSelic(json5, year);
      const jobsData = getJobs(json6, year);
      console.log(json5);

      // console.log(ipcaData);
      console.log(json6);

      setIpca(formatMonth2(ipcaData) as []);
      setAirport(airportData as []);
      setMuniPib(pibData.sort((a, b) => b.pv - a.pv) as []);
      setCompanies(companyData as []);
      setSelic(formatMonth1(selicData) as []);
      setJobs(jobsData as []);

      // console.log("ipca", json1);
      // console.log("aeroporto", json2);
      // console.log("pib", json3);
      // console.log("empresas", json4);
      // console.log("selic", json5);
      // console.log("empregos", json6);

      // console.log(getCompany(json4, "2024"));
      // console.log(getJobs(json6, "2024"));
      // console.log(getSelic(json5, "2024"));
      // console.log(getIPCAAcc(json1, "2024", "Recife"));
      // console.log(getAirport(json2, "2024"));
      // console.log(getPIB(json3, "2021"));

      // const response2 = await fetch(
      //   `http://localhost:3001/api/data/ipca/tabelas/2023_2024`
      // );

      // const response3 = await fetch(
      //   `http://localhost:3001/api/data/ipca/grupos/2023_2024`
      // );
      // const json3 = await response3.json();

      // const json2 = await response2.json();
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const availableYears = ["2024", "2023"];
    setAvailableYears(availableYears);
  }, [setAvailableYears]);

  useEffect(() => {
    fetchData(year);
  }, [year, months]);

  if (loading) return <LoadingScreen />;

  return (
    <div className="p-4 flex flex-col gap-8">
      {/* Title {`${year}`}*/}
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
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
        <div className="bg-white shadow-lg rounded-lg p-4">
          <BarGraph
            type="balanca"
            chartData={muniPib}
            title={`PIB per capita das capitais (NE) - ${2021}`}
          />
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4">
          <BarGraphHorizontal
            type="balanca"
            chartData={airport}
            title={`Movimentação de aeroportos - ${year}`}
          />
        </div>
      </div>

      {/* SECOND ROW OF CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
        <div
          onMouseEnter={() => console.log("a")}
          onMouseLeave={() => console.log("b")}
          className="bg-white shadow-lg rounded-lg p-4"
        >
          {/* { data, dataKey, nameKey, colors, title {`${year}`}} */}
          <PieChartColor
            data={companies}
            title={`Empresas abertas / Recife - ${year}`}
            nameKey="month"
            dataKey="pv"
            colors={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]}
          />
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4">
          <LineGraph
            navigation
            type="ipca"
            chartData={ipca}
            title={`IPCA (acumulado em 12 meses) por mês / Recife - ${year}`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
        <div className="bg-white shadow-lg rounded-lg p-4">
          <LineGraph
            navigation={false}
            type="selic"
            chartData={selic}
            title={`Selic - ${year}`}
          />
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4">
          <PieChartColor
            data={jobs}
            title={`Empregos - Recife - ${year}`}
            nameKey="month"
            dataKey="pv"
            colors={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]}
          />
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

export default PanoramaPage;
