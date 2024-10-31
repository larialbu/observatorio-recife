"use client";

import { useEffect, useState } from "react";
import { useDashboard } from "@/context/DashboardContext";
import CustomPieChart from "@/components/observatorio/aeroporto/graficos/PassageirosPorVoo";
import { PaginatedTable } from "@/components/observatorio/global/PaginedTable";

// GRÁFICOS
import ViagensPorRegiao from "@/components/observatorio/aeroporto/graficos/ViagensPorRegiao";
import EmbarqueDesembarqueRegiao from "@/components/observatorio/aeroporto/graficos/EmbDesPorRegiao";
import MediaViagensPorMes from "@/components/observatorio/aeroporto/graficos/MediaViagensPorMes";
import GraficoCompanhiasPopulares from "@/components/observatorio/aeroporto/graficos/CompanhiasPopulares";
import MediaCargaPorPassageiro from "@/components/observatorio/aeroporto/graficos/MediaCargaPorPassageiro";

// CARDS
import ViagensPorAno from "@/components/observatorio/aeroporto/cards/ViagensPorAno";
import PassageirosPorAno from "@/components/observatorio/aeroporto/cards/PassageirosPorAno";

const AdminPage = () => {
  const { year, setAvailableYears } = useDashboard();
  const [data, setData] = useState([]);
  const [companyData, setCompanyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [companyLoading, setCompanyLoading] = useState(false);
  const [error, setError] = useState(null);
  const [companyError, setCompanyError] = useState(null);
  const [activeTab, setActiveTab] = useState("charts");

  const fetchData = async (selectedYear: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://observatorio-recife-apis.onrender.com/api/data/aeroporto/embarque-desembarque/2023_2024`
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanyData = async (selectedYear: string) => {
    setCompanyLoading(true);
    try {
      const response = await fetch(
        `https://observatorio-recife-apis.onrender.com/api/data/aeroporto/${selectedYear}`
      );
      const json = await response.json();
      setCompanyData(json);
    } catch (error) {
      console.log("error", error);
    } finally {
      setCompanyLoading(false);
    }
  };

  useEffect(() => {
    const availableYears = ["2023", "2024"];
    setAvailableYears(availableYears);
  }, [setAvailableYears]);

  useEffect(() => {
    fetchData(year);
    fetchCompanyData(year);
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

  // extrair cabeçalhos
  const getTableHeadersAndRows = () => {
    if (data.length === 0) return { headers: [], rows: [] };
    const headers = Object.keys(data[0]);
    const rows = data.map((entry: any) => headers.map((header) => entry[header]));
    return { headers, rows };
  };

  const { headers, rows } = getTableHeadersAndRows();

  return (
    <div className="p-6 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Movimentação de aeroportos</h1>
        <p className="text-gray-600">Dados gerais sobre a movimentação dos aeroportos brasileiros</p>
      </div>

      {/* Controle de abas */}
      <div className="flex justify-center mb-8">
        <button
          className={`px-4 py-2 mx-2 rounded ${activeTab === "charts" ? "bg-blue-500 text-white" : "bg-white"}`}
          onClick={() => setActiveTab("charts")}
        >
          Gráficos
        </button>
        <button
          className={`px-4 py-2 mx-2 rounded ${activeTab === "table" ? "bg-blue-500 text-white" : "bg-white"}`}
          onClick={() => setActiveTab("table")}
        >
          Tabela
        </button>
      </div>

      {/* Conteúdo da aba Gráficos */}
      {activeTab === "charts" && (
        <>
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <ViagensPorAno type="Total de viagens ao ano" data={data} year={year} backgroundColor={colors[0]} />
            <PassageirosPorAno type="Média de passageiros por ano" data={data} year={year} color={colors[1]} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
            <div className="bg-white shadow-lg rounded-lg p-4">
              <EmbarqueDesembarqueRegiao title="Embarque e Desembarque por Região" data={data} nameKey="AEROPORTO REGIÃO" colors={colors} year={year} />
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4">
              <ViagensPorRegiao data={data} nameKey="AEROPORTO REGIÃO" colors={colors} year={year} title="Viagens por Região" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
            <div className="bg-white shadow-lg rounded-lg p-4">
              <MediaViagensPorMes title="Média de Viagens por Mês" data={data} dataKey="PASSAGEIRO" nameKey="MÊS" colors={colors} year={year} />
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4">
              <CustomPieChart title="Distribuição de Passageiros por Tipo de Voo" data={data} dataKey="PASSAGEIRO" nameKey="NATUREZA" colors={colors} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white shadow-lg rounded-lg p-4">
              <GraficoCompanhiasPopulares data={companyData} title="Top 5 Companhias Brasileiras" colors={colors} />
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4">
              <MediaCargaPorPassageiro title="Média de Carga por Passageiro por Natureza e Grupo de Voo" data={companyData} colors={colors} />
            </div>
          </div>
        </>
      )}

      {/* Conteúdo da aba Tabela */}
      {activeTab === "table" && headers.length > 0 && (
        <PaginatedTable headers={headers} rows={rows} rowsPerPage={100} />
      )}
    </div>
  );
};

export default AdminPage;
