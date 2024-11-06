"use client";

import { useEffect, useState } from "react";
import { useDashboard } from "@/context/DashboardContext";
import CustomPieChart from "@/components/observatorio/aeroporto/graficos/PassageirosPorVoo";
import { PaginatedTable } from "@/components/observatorio/global/PaginedTable";
import { LoadingScreen } from "@/components/home/LoadingScreen";

// GRÁFICOS
import ViagensPorRegiao from "@/components/observatorio/aeroporto/graficos/ViagensPorRegiao";
import EmbarqueDesembarqueRegiao from "@/components/observatorio/aeroporto/graficos/EmbDesPorRegiao";
import MediaViagensPorMes from "@/components/observatorio/aeroporto/graficos/MediaViagensPorMes";
import GraficoCompanhiasPopulares from "@/components/observatorio/aeroporto/graficos/CompanhiasPopulares";
import MediaCargaPorPassageiro from "@/components/observatorio/aeroporto/graficos/MediaCargaPorPassageiro";

import GraficoPassageirosPorMesAno from "@/components/observatorio/aeroporto/graficos/per_municipios/PassageirosPorAno";
import GraficoDecolagensPorMesAno from "@/components/observatorio/aeroporto/graficos/per_municipios/DecolagensPorMes";
import GraficoCargaPorMesAno from "@/components/observatorio/aeroporto/graficos/per_municipios/CargasPorAno";

import RecifeDataTable from "@/components/observatorio/aeroporto/tables/RecifeTabela";
import SelectedMunicipioDataTable from "@/components/observatorio/aeroporto/tables/MunicipioSelecTabela";

// CARDS
import ViagensPorAno from "@/components/observatorio/aeroporto/cards/ViagensPorAno";
import PassageirosPorAno from "@/components/observatorio/aeroporto/cards/PassageirosPorAno";

import PassageirosTotaisBox from "@/components/observatorio/aeroporto/cards/per_municipio/TotalPassageiros";
import CargaTotalBox from "@/components/observatorio/aeroporto/cards/per_municipio/TotalCarga";
import DecolagensTotaisBox from "@/components/observatorio/aeroporto/cards/per_municipio/TotalDecolagens";

// API
import apiConfig from "@/config/apiConfig";

const AdminPage = () => {
  const { year, setAvailableYears } = useDashboard();
  const [data, setData] = useState([]);
  const [companyData, setCompanyData] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [selectedMunicipio, setSelectedMunicipio] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMunicipios, setFilteredMunicipios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [companyLoading, setCompanyLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [companyError, setCompanyError] = useState(null);
  const [activeTab, setActiveTab] = useState("charts");
  const [activePage, setActivePage] = useState(1);

  // Títulos personalizados para cada página
  const pageTitles = ["Resumo Geral", "Análise Detalhada"];

  //Links de download
  const downloadLinks: any = {
    treated: {
      year: {
        2023: "https://docs.google.com/spreadsheets/d/1P7GCvbo9MpxCsC6ZCcTc53d_cPCt7CVX2Eh5AibWzRQ/export?format=xlsx&authuser=",
        2024: "https://docs.google.com/spreadsheets/d/15aZv1mBH5hcybHxCn_ZhCNrtGusXq1r6sOBLaiu_atc/export?format=xlsx&authuser=",
      },
    },
    brute: {
      year: {
        2023_2024:
          "https://docs.google.com/spreadsheets/d/19rgN4oDdYu41A-hCyOcrElQgS3B2ayu47KlrvGN_xpU/export?format=xlsx&authuser=",
      },
    },
  };

  const getDownloadLink = (type: any) => {
    if (type === "treated" && downloadLinks.treated.year[year]) {
      return downloadLinks.treated.year[year];
    } else if (type === "brute") {
      return downloadLinks.brute.year["2023_2024"];
    }
    return "#"; // fallback para caso o link não exista
  };

  const fetchData = async (selectedYear: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${apiConfig.baseURL}/aeroporto/embarque-desembarque/2023_2024`
      );
      const json = await response.json();
      setData(json);
      const uniqueMunicipios: any = Array.from(
        new Set(json.map((item: any) => item["AEROPORTO NOME"]))
      );
      setMunicipios(uniqueMunicipios);
      setFilteredMunicipios(uniqueMunicipios); // Inicializa com todos os municípios
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
        `${apiConfig.baseURL}/aeroporto/${selectedYear}`
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

  // Filtra os municípios conforme o usuário digita
  useEffect(() => {
    if (searchTerm) {
      setFilteredMunicipios(
        municipios.filter((municipio: any) =>
          municipio.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredMunicipios(municipios);
    }
  }, [searchTerm, municipios]);

  if (loading) return <LoadingScreen />;
  if (error) return <p>{error}</p>;

  const colors = [
    "#EC6625",
    "#0155AE",
    "#52B348",
    "#FFBB28",
    "#8A2BE2",
    "#00CED1",
  ];

  // Extrair cabeçalhos e dados da tabela
  const getTableHeadersAndRows = () => {
    if (data.length === 0) return { headers: [], rows: [] };
    const headers = Object.keys(data[0]);
    const rows = data.map((entry: any) =>
      headers.map((header) => entry[header])
    );
    return { headers, rows };
  };

  const { headers, rows } = getTableHeadersAndRows();

  return (
    <div className="p-6 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Movimentação de aeroportos
        </h1>
        <p className="text-gray-600">
          Dados gerais sobre a movimentação dos aeroportos brasileiros
        </p>
      </div>

      {/* Controle de abas */}
      <div className="flex justify-center mb-8">
        <button
          className={`px-4 py-2 mx-2 rounded ${
            activeTab === "charts" ? "bg-blue-500 text-white" : "bg-white"
          }`}
          onClick={() => setActiveTab("charts")}
        >
          Gráficos
        </button>
        <button
          className={`px-4 py-2 mx-2 rounded ${
            activeTab === "table" ? "bg-blue-500 text-white" : "bg-white"
          }`}
          onClick={() => setActiveTab("table")}
        >
          Tabela
        </button>
        <button
          className={`px-4 py-2 mx-2 rounded ${
            activeTab === "export" ? "bg-blue-500 text-white" : "bg-white"
          }`}
          onClick={() => setActiveTab("export")}
        >
          Exportar Dados
        </button>
      </div>

      {/* Navegação entre páginas de gráficos */}
      {activeTab === "charts" && (
        <>
          <div className="flex justify-center items-center gap-4 mb-10 mt-10">
            <button
              className="flex items-center gap-2 pr-4 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 disabled:opacity-50 transition duration-300"
              disabled={activePage === 1}
              onClick={() => setActivePage(1)}
            >
              <span className="material-icons">
                <svg
                  className="w-[20px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.9991 19L9.83911 14C9.56672 13.7429 9.34974 13.433 9.20142 13.0891C9.0531 12.7452 8.97656 12.3745 8.97656 12C8.97656 11.6255 9.0531 11.2548 9.20142 10.9109C9.34974 10.567 9.56672 10.2571 9.83911 10L14.9991 5"
                    stroke="white"
                    strokeWidth={1.5}
                  />
                </svg>
              </span>
              <span className="hidden sm:inline">{pageTitles[0]}</span>
            </button>

            <p className="flex-grow text-center text-xl sm:text-2xl font-semibold text-gray-800">
              {pageTitles[activePage - 1]}
            </p>

            <button
              className="flex items-center gap-2 pl-4 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 disabled:opacity-50 transition duration-300"
              disabled={activePage === 2}
              onClick={() => setActivePage(2)}
            >
              <span className="hidden sm:inline">{pageTitles[1]}</span>
              <span className="material-icons">
                <svg
                  className="w-[20px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    xmlns="http://www.w3.org/2000/svg"
                    d="M9 5L14.15 10C14.4237 10.2563 14.6419 10.5659 14.791 10.9099C14.9402 11.2539 15.0171 11.625 15.0171 12C15.0171 12.375 14.9402 12.7458 14.791 13.0898C14.6419 13.4339 14.4237 13.7437 14.15 14L9 19"
                    stroke="white"
                    strokeWidth={1.5}
                  />
                </svg>
              </span>
            </button>
          </div>

          {/* Conteúdo da página 1 */}
          {activePage === 1 && (
            <>
              <div className="flex flex-wrap gap-4 justify-center mb-8">
                <ViagensPorAno
                  type="Total de viagens ao ano"
                  data={data}
                  year={year}
                  backgroundColor={colors[0]}
                />
                <PassageirosPorAno
                  type="Média de passageiros por ano"
                  data={data}
                  year={year}
                  color={colors[1]}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
                <div className="bg-white shadow-lg rounded-lg p-4">
                  <EmbarqueDesembarqueRegiao
                    title="Embarque e Desembarque por Região"
                    data={data}
                    nameKey="AEROPORTO REGIÃO"
                    colors={colors}
                    year={year}
                  />
                </div>
                <div className="bg-white shadow-lg rounded-lg p-4">
                  <ViagensPorRegiao
                    data={data}
                    nameKey="AEROPORTO REGIÃO"
                    colors={colors}
                    year={year}
                    title="Viagens por Região"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
                <div className="bg-white shadow-lg rounded-lg p-4">
                  <MediaViagensPorMes
                    title="Média de Viagens por Mês"
                    data={data}
                    dataKey="PASSAGEIRO"
                    nameKey="MÊS"
                    colors={colors}
                    year={year}
                  />
                </div>
                <div className="bg-white shadow-lg rounded-lg p-4">
                  <CustomPieChart
                    title="Distribuição de Passageiros por Tipo de Voo"
                    data={data}
                    dataKey="PASSAGEIRO"
                    nameKey="NATUREZA"
                    colors={colors}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white shadow-lg rounded-lg p-4">
                  <GraficoCompanhiasPopulares
                    data={companyData}
                    title="Top 5 Companhias Brasileiras por Voo"
                    colors={colors}
                  />
                </div>
                <div className="bg-white shadow-lg rounded-lg p-4">
                  <MediaCargaPorPassageiro
                    title="Média de Carga por Passageiro por Natureza e Grupo de Voo"
                    data={companyData}
                    colors={colors}
                  />
                </div>
              </div>
            </>
          )}

          {/* Placeholder para a página 2 */}
          {activePage === 2 && (
            <div className="min-h-[400px] p-2">
              <div className="mb-6 relative">
                <label
                  htmlFor="municipio"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Escolha um município para continuar...
                </label>
                <input
                  type="text"
                  id="municipio"
                  className="p-2 border rounded-lg w-full"
                  placeholder="Digite para buscar um município"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <ul className="absolute z-10 bg-white border rounded-lg w-full mt-1 max-h-48 overflow-y-auto">
                    {filteredMunicipios.map((municipio) => (
                      <li
                        key={municipio}
                        className="p-2 hover:bg-blue-100 cursor-pointer"
                        onClick={() => {
                          setSelectedMunicipio(municipio);
                          setSearchTerm(municipio); // Atualiza o campo de busca
                          setFilteredMunicipios([]); // Limpa as sugestões
                        }}
                      >
                        {municipio}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex flex-wrap gap-4 justify-center mb-8">
                <PassageirosTotaisBox
                  data={data}
                  year={year}
                  municipio={selectedMunicipio}
                  backgroundColor={colors[0]}
                />
                <CargaTotalBox
                  data={data}
                  year={year}
                  municipio={selectedMunicipio}
                  backgroundColor={colors[1]}
                />
                <DecolagensTotaisBox
                  data={data}
                  year={year}
                  municipio={selectedMunicipio}
                  backgroundColor={colors[2]}
                />
              </div>

              {/* Gráfico de Total de Passageiros por Ano */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
                {selectedMunicipio && (
                  <GraficoPassageirosPorMesAno
                    data={data}
                    municipio={selectedMunicipio}
                    year={year}
                    color={colors}
                  />
                )}
                {selectedMunicipio && (
                  <GraficoDecolagensPorMesAno
                    data={data}
                    municipio={selectedMunicipio}
                    year={year}
                    color={colors}
                  />
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 mb-4">
                {selectedMunicipio && (
                  <GraficoCargaPorMesAno
                    data={data}
                    municipio={selectedMunicipio}
                    year={year}
                    color={colors}
                  />
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
                <RecifeDataTable data={data} year={year} color={colors[0]} />

                {selectedMunicipio && (
                  <SelectedMunicipioDataTable
                    data={data}
                    municipio={selectedMunicipio}
                    year={year}
                    color={colors[1]}
                  />
                )}
              </div>
            </div>
          )}
        </>
      )}

      {/* Conteúdo da aba Tabela */}
      {activeTab == "table" && headers.length > 0 && (
        <PaginatedTable headers={headers} rows={rows} rowsPerPage={100} />
      )}

      {activeTab === "export" && (
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Download de Dados {year}
          </h2>
          <div className="flex gap-4">
            {/* Botão para dados tratados */}
            <a
              href={getDownloadLink("treated")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
                Baixar Dados Tratados
              </button>
            </a>

            {/* Botão para dados brutos */}
            <a
              href={getDownloadLink("brute")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
                Baixar Dados Brutos
              </button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
