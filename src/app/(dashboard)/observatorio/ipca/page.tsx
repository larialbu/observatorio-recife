// AdminPage.tsx

"use client";

import { useEffect, useState } from "react";
import { useDashboard } from "@/context/DashboardContext";
import { PaginatedTable } from "@/components/observatorio/global/PaginedTable";

import CardBalance from "@/components/observatorio/ipca/cards/CardBalance";

import { LineGraph } from "@/components/observatorio/ipca/graphs/LineGraph";

import { LoadingScreen } from "@/components/home/LoadingScreen";
import { BarGraph } from "@/components/observatorio/ipca/graphs/BarGraph";
import { BrushBar } from "@/components/observatorio/ipca/graphs/BrushBar";
import { IPCTable } from "@/components/observatorio/ipca/graphs/CapitalsTable";
import { GroupTable } from "@/components/observatorio/ipca/graphs/GroupTable";
import { SubGroupTable } from "@/components/observatorio/ipca/graphs/SubGroupTable";
import { ItemTable } from "@/components/observatorio/ipca/graphs/ItemTable";
import { RadarGraph } from "@/components/observatorio/ipca/graphs/RadarGraph";

import {
  getAvaibleMonths,
  getFiveCapitals,
  getFiveGroups,
  getIPCAAcc,
  getIPCACards,
  getIPCAMonth,
  tableInfos,
} from "@/components/observatorio/ipca/functions/exportFunctions";
import { SelectMonth } from "@/components/SelectMonth";

const AdminPage = () => {
  const { year, setAvailableYears } = useDashboard();
  const [months, setMonths] = useState<string>("setembro");
  const [monthsAvaible, setmonthsAvaible] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState<
    "charts" | "table general" | "table groups" | "table tables"
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

  const fetchData = async (selectedYear: string) => {
    setLoading(true);
    try {
      const response1 = await fetch(
        `http://localhost:3001/api/data/ipca/indice-geral/2023_2024`
      );

      const response2 = await fetch(
        `http://localhost:3001/api/data/ipca/tabelas/2023_2024`
      );

      const response3 = await fetch(
        `http://localhost:3001/api/data/ipca/grupos/2023_2024`
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
      </div>
      {activeTab === "table general" ||
      activeTab === "table groups" ||
      activeTab === "table tables" ? (
        <div className="mb-4 flex justify-center">
          <button
            onClick={() => setActiveTab("table general")}
            className={`px-4 py-2 mx-2 ${
              activeTab === "table general"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700"
            } rounded`}
          >
            Geral
          </button>
          <button
            onClick={() => setActiveTab("table groups")}
            className={`px-4 py-2 mx-2 ${
              activeTab === "table groups"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700"
            } rounded`}
          >
            Grupos
          </button>
          <button
            onClick={() => setActiveTab("table tables")}
            className={`px-4 py-2 mx-2 ${
              activeTab === "table tables"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700"
            } rounded`}
          >
            Tabelas
          </button>
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

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
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

      {activeTab != "charts" && headers.length > 0 ? (
        <PaginatedTable headers={headers} rows={rows} rowsPerPage={100} />
      ) : (
        <p className="text-center mt-10">nenhum dado</p>
      )}
    </div>
  );
};

export default AdminPage;
