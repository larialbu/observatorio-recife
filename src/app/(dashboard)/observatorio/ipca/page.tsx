// AdminPage.tsx

"use client";

import { useEffect, useState } from "react";
import { useDashboard } from "@/context/DashboardContext";
import { SelectMuni } from "@/components/SelectMuni";
import { PaginatedTable } from "@/components/observatorio/global/PaginedTable";

import CardBalance from "@/components/observatorio/ipca/cards/CardBalance";
import { RadarGraph } from "@/components/observatorio/balancaComercial/graphs/RadarGraph";
import { PercentAreaChart } from "@/components/observatorio/balancaComercial/graphs/PercentAreaGraph";
import { LineGraph } from "@/components/observatorio/ipca/graphs/LineGraph";
import {
  formatMonths,
  formatNumber,
  getBalance,
  getCardsInfos,
  getContinent,
  getCountrys,
  getExport,
  getImport,
  getMainCountry,
  getMunicipios,
  getSHInfos,
} from "@/components/observatorio/balancaComercial/functions/exportFunctions";
import { LoadingScreen } from "@/components/home/LoadingScreen";
import { SHTable } from "@/components/observatorio/balancaComercial/graphs/SHTable";
import { BarGraph } from "@/components/observatorio/ipca/graphs/BarGraph";
import { BrushBar } from "@/components/observatorio/ipca/graphs/BrushBar";

const AdminPage = () => {
  const { year, setAvailableYears } = useDashboard();
  const [municipality, setMunicipality] = useState<string>("");
  const [municipalityAvaible, setMunicipalityAvaible] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState<"charts" | "table">("charts");

  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<string[][]>([]);

  const [cardsInfo, setCardsInfo] = useState({
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
  const [SHData, setSHData] = useState([]);

  const fetchData = async (selectedYear: string) => {
    setLoading(true);
    try {
      `http://localhost:3001/api/data/balanco-comercial/geral/2023_2024`;

      const response = await fetch(
        `http://localhost:3001/api/data/balanco-comercial/geral/2023_2024`
      );

      const json = await response.json();

      const cardsInfos = getCardsInfos(json, selectedYear);
      const mainCuntrys = getMainCountry(json, selectedYear);
      const continents = getContinent(json, selectedYear);
      const balance = getBalance(json, selectedYear, municipality);
      const countrys = getCountrys(json, selectedYear);
      const expo = getExport(json, selectedYear, municipality);
      const impo = getImport(json, selectedYear, municipality);

      console.log(json);
      setSHData(getSHInfos(json, selectedYear, "Recife - PE") as []);

      setMunicipalityAvaible(getMunicipios(json));

      setCardsInfo(cardsInfos);
      setMainCuntrysData(formatMonths(mainCuntrys.data) as []);
      setContinentsData(continents as []);
      setBalanceData(formatMonths(balance) as []);
      setCountrysData(countrys.data as []);
      setExpoData(formatMonths(expo) as []);
      setImpoData(formatMonths(impo) as []);

      // definir headers e linhas
      if (json.length > 0) {
        setHeaders(Object.keys(json[0]));
        setRows(json.map((entry: any) => Object.values(entry).map(String)));
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const availableYears = ["2023"];
    setAvailableYears(availableYears);
  }, [setAvailableYears]);

  useEffect(() => {
    fetchData(year);
  }, [year, municipality]);

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

  return (
    <div className="p-6 min-h-screen">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">IPCA</h1>
        <p className="text-gray-600">
          Dados gerais sobre a dinâmica da inflação brasileira medida pelo IPCA
        </p>
      </div>

      {/* Combobox de Municípios */}
      <div className="flex justify-center w-full mb-6">
        {/* <SelectMuni
          municipality={municipality}
          setMunicipality={setMunicipality}
          municipalityAvaible={municipalityAvaible}
        /> */}
        <p> fazer input para selecionar um mês especifico</p>
      </div>

      {/* alternar entre gráficos e tabela */}
      <div className="mb-4 flex justify-center">
        <button
          onClick={() => setActiveTab("charts")}
          className={`px-4 py-2 mx-2 ${
            activeTab === "charts"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700"
          } rounded`}
        >
          Gráficos
        </button>
        <button
          onClick={() => setActiveTab("table")}
          className={`px-4 py-2 mx-2 ${
            activeTab === "table"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700"
          } rounded`}
        >
          Tabela
        </button>
      </div>

      {activeTab === "charts" && (
        <div>
          {/* gráficos */}
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <CardBalance
              type="IPCA acumulado ano/recife"
              data={32.2}
              year={year}
              color={colors[0]}
            />
            <CardBalance
              type="IPCA 12 meses/recife"
              data={14.5}
              year={year}
              color={colors[1]}
            />
            <CardBalance
              type="IPCA acumulado ano/brasil"
              data={20.2}
              year={year}
              color={colors[2]}
            />
            <CardBalance
              type="IPCA 12 meses/brasil"
              data={20.2}
              year={year}
              color={colors[1]}
            />
          </div>
          {/* Primeira linha de gráficos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
            <div className="bg-white shadow-lg rounded-lg p-4">
              <BrushBar title="IPCA meses - Recife (talvez clocar line)" />
            </div>

            <div className="bg-white shadow-lg rounded-lg p-4">
              <BrushBar title="IPCA meses - Brasil (talvez clocar line)" />
              {/* <RadarGraph
                chartData={continentsData}
                title="princípais grupos "
              /> */}
            </div>
          </div>

          {/* Segunda linha de gráficos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
            <div className="bg-white shadow-lg rounded-lg p-4">
              <RadarGraph
                chartData={continentsData}
                title="particiáção dos princípais grupos em Outubro no IPCA"
              />
              {/* <LineGraph
                muni={municipality}
                chartData={balanceData}
                title="Valor total de importação e exportação mensal"
                type="recife"
              /> */}
            </div>

            <div className="bg-white shadow-lg rounded-lg p-4">
              <BarGraph
                type="balanca"
                chartData={countrysData}
                title="principais capitais"
              />
            </div>
          </div>

          {/* Terceira linha de gráficos */}
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
            <div className="bg-white shadow-lg rounded-lg p-4">
              <LineGraph
                muni={municipality}
                type="recife"
                chartData={expoData}
                title="crescimento do IPCA por mês"
              />
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4">
              <LineGraph
                muni={municipality}
                type="recife"
                chartData={impoData}
                title="Exportação por mês"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
            <div className="bg-white shadow-lg rounded-lg p-4">
              <SHTable
                type="import"
                data={SHData}
                title="ranking IPCA capitais"
              />
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4">
              <SHTable type="import" data={SHData} title="IPCA por grupo" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white shadow-lg rounded-lg p-4">
              <SHTable type="export" data={SHData} title="IPCA por subgrupo" />
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4">
              <SHTable type="export" data={SHData} title="IPCA por item" />
            </div>
          </div>
        </div>
      )}

      {activeTab === "table" && headers.length > 0 && (
        <PaginatedTable headers={headers} rows={rows} rowsPerPage={100} />
      )}
    </div>
  );
};

export default AdminPage;
