"use client";

import { useEffect, useState } from "react";
import { useDashboard } from "@/context/DashboardContext";
import CustomPieChart from "@/components/observatorio/aeroporto/graficos/PassageirosPorVoo";

// GRÁFICOS
import ViagensPorRegiao from "@/components/observatorio/aeroporto/graficos/ViagensPorRegiao";
import EmbarqueDesembarqueRegiao from "@/components/observatorio/aeroporto/graficos/EmbDesPorRegiao";
import MediaViagensPorMes from "@/components/observatorio/aeroporto/graficos/MediaViagensPorMes";
import GraficoCompanhiasPopulares from "@/components/observatorio/aeroporto/graficos/CompanhiasPopulares";
import MediaCargaPorPassageiro from "@/components/observatorio/aeroporto/graficos/MediaCargaPorPassageiro";

// CARDS
import ViagensPorAno from "@/components/observatorio/aeroporto/cards/ViagensPorAno";
import PassageirosPorAno from "@/components/observatorio/aeroporto/cards/PassageirosPorAno";
import CardBalance from "@/components/observatorio/balancaComercial/cards/CardBalance";
import { RadarGraph } from "@/components/observatorio/balancaComercial/graphs/RadarGraph";
import { PercentAreaChart } from "@/components/observatorio/balancaComercial/graphs/PercentAreaGraph";
import { LineGraph } from "@/components/observatorio/balancaComercial/graphs/LineGraph";
import { BarSimpleChart } from "@/components/observatorio/balancaComercial/graphs/BarSimpleChart";
import { calcularExportacaoImportacao } from "@/components/observatorio/balancaComercial/functions/calcExpImport";
import { getExport } from "@/components/observatorio/balancaComercial/functions/getExport";
import { getImport } from "@/components/observatorio/balancaComercial/functions/getImport";
import { getBalance } from "@/components/observatorio/balancaComercial/functions/getBalance";
import { getMainCountry } from "@/components/observatorio/balancaComercial/functions/getMainCountry";
import { getContinent } from "@/components/observatorio/balancaComercial/functions/getContinents";
import { getCountrys } from "@/components/observatorio/balancaComercial/functions/getCountrys";
import { getCardsInfos } from "@/components/observatorio/balancaComercial/functions/getCardsInfos";

const AdminPage = () => {
  const { year, setAvailableYears } = useDashboard();
  const [companyData, setCompanyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [companyLoading, setCompanyLoading] = useState(false);
  const [error, setError] = useState(null);
  const [companyError, setCompanyError] = useState(null);

  const [cardsInfo, setCardsInfo] = useState<{
    totalExport: number;
    totalImport: number;
    diference: number;
  }>({
    totalExport: 0,
    totalImport: 0,
    diference: 0,
  });
  const [mainCuntrysData, setMainCuntrysData] = useState([]);
  const [continentsData, setContinentsData] = useState([]);
  const [balanceData, setBalanceData] = useState([]);
  const [countrysData, setCountrysData] = useState([]);
  const [expoData, setExpoData] = useState([]);
  const [impoData, setImpoData] = useState([]);

  const fetchData = async (selectedYear: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/api/data/balanco-comercial/geral/2023_2024`
      );

      const json = await response.json();

      const cardsInfos = getCardsInfos(json, "2023");

      const mainCuntrys = getMainCountry(json, "2023");
      const continents = getContinent(json, "2023");
      const balance = getBalance(json, "2023");
      const countrys = getCountrys(json, "2023");
      const expo = getExport(json, "2023");
      const impo = getImport(json, "2023");

      setCardsInfo(cardsInfos);
      setMainCuntrysData(mainCuntrys.data as []);
      setContinentsData(continents as []);
      setBalanceData(balance as []);
      setCountrysData(countrys.data as []);
      setExpoData(expo as []);
      setImpoData(impo as []);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  //
  // const fetchCompanyData = async (selectedYear: string) => {
  //   setCompanyLoading(true);
  //   try {
  //     const response = await fetch(
  //       `http://localhost:3001/api/data/aeroporto/${selectedYear}`
  //     );
  //     const json = await response.json();
  //     setCompanyData(json);
  //   } catch (error) {
  //     console.log("error", error);
  //   } finally {
  //     setCompanyLoading(false);
  //   }
  // };

  useEffect(() => {
    ////////ATENÇÃO; AQUI ESTÁ A DINÂMICA DE PASSAR AS DATAS PARA A NAV E ASSIM MUDAR DE API
    const availableYears = ["2023", "2024"];
    ////////////////////////////////

    setAvailableYears(availableYears);
  }, [setAvailableYears]);

  useEffect(() => {
    fetchData(year);
    // fetchCompanyData(year);
  }, [year]);

  if (loading || companyLoading) return <p>Carregando dados...</p>;
  if (error || companyError) return <p>{error || companyError}</p>;

  const colors = [
    "#EC6625",
    "#0155AE",
    "#52B348",
    "#FFBB28",
    "#8A2BE2",
    "#00CED1",
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* CARDS */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <CardBalance
          type="Valor de importações ao ano"
          data={cardsInfo?.totalImport}
          year={year}
          color={colors[0]}
        />

        <CardBalance
          type="Valor de exportações ao ano"
          data={cardsInfo?.totalExport}
          year={year}
          color={colors[1]}
        />

        <CardBalance
          type="diferença exportação e importação"
          data={cardsInfo?.diference}
          year={year}
          color={colors[2]}
        />
      </div>

      {/* Primeira linha de gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
        <div className="bg-white shadow-lg rounded-lg p-4">
          <PercentAreaChart
            type="balanca"
            chartData={mainCuntrysData}
            title="importação e expotaçaõ para os 5 países princípais"
          />
        </div>

        <div className="bg-white shadow-lg rounded-lg p-4">
          <RadarGraph
            chartData={continentsData}
            title="continentes importação e expotaçaõ"
          />
        </div>
      </div>

      {/* Segunda linha de gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
        <div className="bg-white shadow-lg rounded-lg p-4">
          <LineGraph
            chartData={balanceData}
            title="total importação exportação mensal"
            type="recife"
          />
        </div>

        <div className="bg-white shadow-lg rounded-lg p-4">
          <BarSimpleChart
            type="balanca"
            chartData={countrysData}
            title="paises tabela horizontal impo/expo"
          />
        </div>
      </div>

      {/* Terceira linha de gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-4">
          <LineGraph
            type="recife"
            chartData={expoData}
            title="importaçao por Mês"
          />
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4">
          <LineGraph
            type="recife"
            chartData={impoData}
            title="exportação por Mês"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
