"use client";

import { useEffect, useState } from "react";
import { useDashboard } from "@/context/DashboardContext";
import { PaginatedTable } from "@/components/observatorio/global/PaginedTable";

import CardBalance from "@/components/observatorio/ipca/cards/CardBalance";

import { LineGraph } from "@/components/@global/charts/temp/ipca/LineGraph";

import { LoadingScreen } from "@/components/home/LoadingScreen";
import { BarGraph } from "@/components/@global/charts/temp/ipca/BarGraph";
import { BrushBar } from "@/components/@global/charts/temp/ipca/BrushBar";
import { IPCTable } from "@/components/@global/tables/temp/ipca/CapitalsTable";
import { GroupTable } from "@/components/@global/tables/temp/ipca/GroupTable";
import { SubGroupTable } from "@/components/@global/tables/temp/ipca/SubGroupTable";
import { ItemTable } from "@/components/@global/tables/temp/ipca/ItemTable";
import { RadarGraph } from "@/components/@global/charts/temp/ipca/RadarGraph";

import {
  getAvaibleMonths,
  getFiveCapitals,
  getFiveGroups,
  getIPCAAcc,
  getIPCACards,
  getIPCAMonth,
  tableInfos,
} from "@/functions/process_data/observatorio/ipca/exportFunctions";
import { SelectMonth } from "@/components/random_temp/SelectMonth";

//API
import apiConfig from "@/@api/config/apiConfig";

const IpcaPage = () => {
  const { year, setAvailableYears } = useDashboard();
  const [months, setMonths] = useState<string>("setembro");
  const [monthsAvaible, setmonthsAvaible] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState<
    | "charts"
    | "table general"
    | "table groups"
    | "table tables"
    | "export"
    | "export1"
    | "export2"
  >("charts");

  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<string[][]>([]);

  const [dataTables, setDataTables] = useState({
    data1: [],
    data2: [],
    data3: [],
  });
  const [recCards, setRecCards] = useState({
    acumulado12Meses: "",
    acumuladoAno: "",
    capital: "",
    mes: "",
    variacaoMensal: "",
  });
  const [braCards, setBraCards] = useState({
    acumulado12Meses: "",
    acumuladoAno: "",
    capital: "",
    mes: "",
    variacaoMensal: "",
  });
  const [recAcc, setRecAcc] = useState([]);
  const [braAcc, setBraAcc] = useState([]);
  const [recMonth, setRecMonth] = useState([]);
  const [braMonth, setBraMonth] = useState([]);
  const [groupsIPCA, setGroupsIPCA] = useState([]);
  const [capitalsIPCA, setCapitalsIPCA] = useState([]);

  const downloadLinks: any = {
    treated: {
      data: {
        all: "https://docs.google.com/spreadsheets/d/1NPOa3U0rbjHnkTXLtEcrsKMq3nVHOAd-bV4OwJOyJ-c/export?format=xlsx&authuser=",
        group:
          "https://docs.google.com/spreadsheets/d/1IlEOY575Oo7Qf9jb6AauUiI7B9h2bl9g6gc5t7ANsTc/export?format=xlsx&authuser=",
        table:
          "https://docs.google.com/spreadsheets/d/1R2_paslrBGYKNJlYwhdUTLIvG2pPSkIHDxtynM_hw0o/export?format=xlsx&authuser=",
      },
    },
    brute: {
      data: "https://docs.google.com/spreadsheets/d/1HSkl9Eu35TRaqHKEP0IEw89LTdnZrpN1-TE65Edem9k/export?format=xlsx&authuser=",
    },
  };

  // "all"
  // "group"
  // "table"

  const getDownloadLink = (type: any) => {
    if (type === "all") {
      return downloadLinks.treated.data.all;
    } else if (type === "group") {
      return downloadLinks.brute.data.group;
    } else if (type === "table") {
      return downloadLinks.brute.data.table;
    } else if (type === "table1") {
      return downloadLinks.brute.data;
    } else if (type === "table2") {
      return downloadLinks.brute.data;
    }
    return "#"; // fallback para caso o link não exista
  };

  const fetchData = async (selectedYear: string) => {
    setLoading(true);
    try {
      const response1 = await fetch(
        `${apiConfig.baseURL}/ipca/indice-geral/2023_2024`
      );

      const response2 = await fetch(
        `${apiConfig.baseURL}/ipca/tabelas/2023_2024`
      );

      const response3 = await fetch(
        `${apiConfig.baseURL}/ipca/grupos/2023_2024`
      );
      const json3 = await response3.json();

      const json2 = await response2.json();

      const json1 = await response1.json();

      const cardsDataRec = getIPCACards(json1, `${months} ${year}`, "Recife");
      const cardsDataBra = getIPCACards(json1, `${months} ${year}`, "Brasil");
      const IPCAAccRecData = getIPCAAcc(json1, year, "Recife");
      const IPCAAccBraData = getIPCAAcc(json1, year, "Brasil");
      const IPCAMonthRecData = getIPCAMonth(json1, year, "Recife");
      const IPCAMonthBraData = getIPCAMonth(json1, year, "Brasil");
      const IPCAGroupsData = getFiveGroups(json3, `${months}/${year}`);
      const IPCACapitalsData = getFiveCapitals(json1, `${months} ${year}`);

      setRecCards(
        cardsDataRec as {
          acumulado12Meses: string;
          acumuladoAno: string;
          capital: string;
          mes: string;
          variacaoMensal: string;
        }
      );
      setBraCards(
        cardsDataBra as {
          acumulado12Meses: string;
          acumuladoAno: string;
          capital: string;
          mes: string;
          variacaoMensal: string;
        }
      );
      setRecAcc(IPCAAccRecData as []);
      setBraAcc(IPCAAccBraData as []);
      setRecMonth(IPCAMonthRecData as []);
      setBraMonth(IPCAMonthBraData as []);
      setGroupsIPCA(IPCAGroupsData as []);
      setCapitalsIPCA(IPCACapitalsData as []);

      setDataTables({
        data1: json1,
        data2: json2,
        data3: json3,
      });

      setmonthsAvaible(getAvaibleMonths(json1, year));

      tableInfos(
        {
          data1: json1,
          data2: json2,
          data3: json3,
        },
        "table general",
        setHeaders,
        setRows
      );
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    tableInfos(dataTables, activeTab, setHeaders, setRows);
  }, [activeTab]);

  useEffect(() => {
    const availableYears = ["2024", "2023"];
    setAvailableYears(availableYears);
  }, [setAvailableYears]);

  useEffect(() => {
    fetchData(year);
  }, [year, months]);

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
        <SelectMonth
          months={months}
          setMonths={setMonths}
          monthsAvaible={monthsAvaible}
        />
      </div>

      {/* alternar entre gráficos e tabela */}
      <div className=" flex justify-center mb-8">
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
          onClick={() => setActiveTab("table general")}
          className={`px-4 py-2 mx-2 ${
            activeTab === "table general" ||
            activeTab === "table groups" ||
            activeTab === "table tables"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700"
          } rounded`}
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
      {activeTab === "table general" ||
      activeTab === "table groups" ||
      activeTab === "table tables" ? (
        <div className="mb-4 flex flex-col items-center">
          <p className="text-gray-500 mb-3 mt-4">Categorias de tabela:</p>
          <div className="flex flex-row buttons-content">
            <button
              onClick={() => setActiveTab("table general")}
              className={`px-4 py-2 mx-2 ${
                activeTab === "table general"
                  ? "bg-[#EC6625] text-white"
                  : "bg-white text-gray-700"
              } rounded`}
            >
              Geral
            </button>
            <button
              onClick={() => setActiveTab("table groups")}
              className={`px-4 py-2 mx-2 ${
                activeTab === "table groups"
                  ? "bg-[#EC6625] text-white"
                  : "bg-white text-gray-700"
              } rounded`}
            >
              Grupos
            </button>
            <button
              onClick={() => setActiveTab("table tables")}
              className={`px-4 py-2 mx-2 ${
                activeTab === "table tables"
                  ? "bg-[#EC6625] text-white"
                  : "bg-white text-gray-700"
              } rounded`}
            >
              Tabelas
            </button>
          </div>
        </div>
      ) : (
        ""
      )}

      {activeTab === "charts" && (
        <div>
          {/* gráficos */}
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <CardBalance
              type="IPCA acumulado ano/recife"
              data={recCards.acumuladoAno}
              year={year}
              color={colors[0]}
            />
            <CardBalance
              type="IPCA 12 meses/recife"
              data={recCards.acumulado12Meses}
              year={year}
              color={colors[1]}
            />
            <CardBalance
              type="IPCA acumulado ano/brasil"
              data={braCards.acumuladoAno}
              year={year}
              color={colors[2]}
            />
            <CardBalance
              type="IPCA 12 meses/brasil"
              data={braCards.acumulado12Meses}
              year={year}
              color={colors[1]}
            />
          </div>
          {/* Primeira linha de gráficos */}
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
            <div className="bg-white shadow-lg rounded-lg p-4">
              <LineGraph
                type="recife"
                chartData={recAcc}
                title="IPCA (acumulado em 12 meses) por mês - Recife"
              />
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4">
              <LineGraph
                type="recife"
                chartData={braAcc}
                title="IPCA (acumulado em 12 meses) por mês - Brasil"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
            <div className="bg-white shadow-lg rounded-lg p-4">
              <BrushBar
                chartData={recMonth}
                title="IPCA variação mensal - Recife"
              />
            </div>

            <div className="bg-white shadow-lg rounded-lg p-4">
              <BrushBar
                chartData={braMonth}
                title="IPCA variação mensal - Brasil"
              />
            </div>
          </div>

          {/* Segunda linha de gráficos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
            <div className="bg-white shadow-lg rounded-lg p-4">
              <RadarGraph
                chartData={groupsIPCA}
                title={`particiáção dos princípais grupos em ${months} no IPCA - Recife`}
              />
            </div>

            <div className="bg-white shadow-lg rounded-lg p-4">
              <BarGraph
                type="balanca"
                chartData={capitalsIPCA}
                title="principais capitais"
              />
            </div>
          </div>

          {/* Terceira linha de gráficos */}

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
            <div className="bg-white shadow-lg   rounded-lg p-4">
              <IPCTable
                data={dataTables.data1}
                title="IPCA por capitais"
                selectedMonth={`${months} ${year}`}
              />
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4">
              <GroupTable
                data={dataTables.data3}
                title="IPCA por grupo"
                selectedMonth={`${months}/${year}`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
            <div className="bg-white shadow-lg rounded-lg p-4">
              <SubGroupTable
                data={dataTables.data3}
                title="IPCA por subgrupo"
                selectedMonth={`${months}/${year}`}
              />
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4">
              <ItemTable
                data={dataTables.data3}
                title="IPCA por item"
                selectedMonth={`${months}/${year}`}
              />
            </div>
          </div>
        </div>
      )}
      {activeTab === "table general" ||
      activeTab === "table groups" ||
      (activeTab === "table tables" && headers.length > 0) ? (
        <PaginatedTable headers={headers} rows={rows} rowsPerPage={100} />
      ) : (
        ""
      )}

      {activeTab.includes("export") && (
        <div className="flex flex-col items-center mt-[50px]">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Download de Dados 2023 - 2024
          </h2>
          <div className="flex gap-4">
            {/* Botão para dados tratados */}

            <button
              onClick={() => setActiveTab("export1")}
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
            >
              Baixar Dados Tratados
            </button>

            {/* Botão para dados brutos */}

            <button
              onClick={() => setActiveTab("export2")}
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
            >
              Baixar Dados Brutos
            </button>
          </div>
        </div>
      )}
      {activeTab == "export1" && (
        <div className="justify-center flex gap-4 mt-4">
          <a
            href={getDownloadLink("all")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
              Geral
            </button>
          </a>

          <a
            href={
              "https://docs.google.com/spreadsheets/d/1IlEOY575Oo7Qf9jb6AauUiI7B9h2bl9g6gc5t7ANsTc/export?format=xlsx&authuser="
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
              Grupos
            </button>
          </a>

          <a
            href={
              "https://docs.google.com/spreadsheets/d/1R2_paslrBGYKNJlYwhdUTLIvG2pPSkIHDxtynM_hw0o/export?format=xlsx&authuser="
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
              Tabelas
            </button>
          </a>
        </div>
      )}

      {activeTab == "export2" && (
        <div className="justify-center flex gap-4 mt-4">
          <a
            href={
              "https://docs.google.com/spreadsheets/d/1vsFO_kUeadrTeCSpk4UZlZlyVuk8MAPeOXNN6B_rhtY/export?format=xlsx&authuser="
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
              Índice 12 meses
            </button>
          </a>

          <a
            href={
              "https://docs.google.com/spreadsheets/d/1zSej8Xbdi5qXP3qR9dP8TujyfFeXDqBw4CwawxIbzHA/export?format=xlsx&authuser="
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
              Mensal
            </button>
          </a>

          <a
            href={
              "https://docs.google.com/spreadsheets/d/1kV18v3BONvI93paamaNLN5PqYdz-yEPaSejiP3nQPFQ/export?format=xlsx&authuser="
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
              Acumulado
            </button>
          </a>
        </div>
      )}
    </div>
  );
};

export default IpcaPage;
