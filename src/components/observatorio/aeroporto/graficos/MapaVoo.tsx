import { useState, useEffect, useRef, useCallback } from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

interface Voo {
  empresa: string;
  origem: {
    sigla: string;
    nome: string;
    regiao: string;
    uf: string;
    continente: string;
    pais: string;
  };
  destino: {
    sigla: string;
    nome: string;
    regiao: string;
    uf: string;
    continente: string;
    pais: string;
  };
  carga: number;
  passageiros: number;
  distancia: number;
  combustivel: number;
  horasVoada: string;
  curiosidade: string;
  ano: string;
  mes: string;
}

interface LinhaDoTempoVoosProps {
  data: any[];
}

const MapaInterativoVoos = ({ data }: LinhaDoTempoVoosProps) => {
  const [selectedVoo, setSelectedVoo] = useState<Voo | null>(null);
  const [displayData, setDisplayData] = useState<Voo[]>([]);
  const [page, setPage] = useState(1);
  const [searchOrigem, setSearchOrigem] = useState("");
  const [searchDestino, setSearchDestino] = useState("");
  const [filteredAirportsOrigem, setFilteredAirportsOrigem] = useState<string[]>([]);
  const [filteredAirportsDestino, setFilteredAirportsDestino] = useState<string[]>([]);
  const [showOrigemOptions, setShowOrigemOptions] = useState(false);
  const [showDestinoOptions, setShowDestinoOptions] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const observerRef = useRef<HTMLDivElement | null>(null);
  const itemsPerPage = 20;

  const processarDados = useCallback(() => {
    return data
      .filter(
        (voo) =>
          voo["AEROPORTO DE ORIGEM (PAÍS)"] === "BRASIL" &&
          voo["AEROPORTO DE DESTINO (PAÍS)"] === "BRASIL" &&
          (!selectedMonth || voo["MÊS"] === selectedMonth)
      )
      .map((voo) => ({
        empresa: voo["EMPRESA (NOME)"] || "Empresa Desconhecida",
        origem: {
          sigla: voo["AEROPORTO DE ORIGEM (SIGLA)"] || "N/A",
          nome: voo["AEROPORTO DE ORIGEM (NOME)"] || "N/A",
          regiao: voo["AEROPORTO DE ORIGEM (REGIÃO)"] || "N/A",
          uf: voo["AEROPORTO DE ORIGEM (UF)"] || "N/A",
          continente: voo["AEROPORTO DE ORIGEM (CONTINENTE)"] || "N/A",
          pais: voo["AEROPORTO DE ORIGEM (PAÍS)"] || "N/A",
        },
        destino: {
          sigla: voo["AEROPORTO DE DESTINO (SIGLA)"] || "N/A",
          nome: voo["AEROPORTO DE DESTINO (NOME)"] || "N/A",
          regiao: voo["AEROPORTO DE DESTINO (REGIÃO)"] || "N/A",
          uf: voo["AEROPORTO DE DESTINO (UF)"] || "N/A",
          continente: voo["AEROPORTO DE DESTINO (CONTINENTE)"] || "N/A",
          pais: voo["AEROPORTO DE DESTINO (PAÍS)"] || "N/A",
        },
        carga: parseFloat(voo["CARGA PAGA (KG)"] || 0) + parseFloat(voo["CARGA GRÁTIS (KG)"] || 0),
        passageiros: parseInt(voo["PASSAGEIROS PAGOS"], 10) + parseInt(voo["PASSAGEIROS GRÁTIS"], 10),
        distancia: parseFloat(voo["DISTÂNCIA VOADA (KM)"]) || 0,
        combustivel: parseFloat(voo["COMBUSTÍVEL (LITROS)"]) || 0,
        horasVoada: voo["HORAS VOADAS"] || "N/A",
        curiosidade: `O voo percorreu ${voo["DISTÂNCIA VOADA (KM)"] || "0"} km usando ${
          voo["COMBUSTÍVEL (LITROS)"] || "0"
        } litros de combustível.`,
        ano: voo["ANO"],
        mes: voo["MÊS"],
      }))
      .filter(
        (voo) =>
          voo.origem.nome.toLowerCase().includes(searchOrigem.toLowerCase()) &&
          voo.destino.nome.toLowerCase().includes(searchDestino.toLowerCase())
      );
  }, [data, searchOrigem, searchDestino, selectedMonth]);

  useEffect(() => {
    const newDisplayData = processarDados().slice(0, page * itemsPerPage);
    setDisplayData(newDisplayData);
  }, [page, processarDados]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { root: document.querySelector(".timeline"), rootMargin: "0px", threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, []);

  useEffect(() => {
    const uniqueAirportsOrigem = Array.from(
      new Set(
        data
          .map((voo) => voo["AEROPORTO DE ORIGEM (NOME)"])
          .filter((nome) => nome && nome.toLowerCase().includes(searchOrigem.toLowerCase()))
      )
    ).slice(0, 10);

    const uniqueAirportsDestino = Array.from(
      new Set(
        data
          .map((voo) => voo["AEROPORTO DE DESTINO (NOME)"])
          .filter((nome) => nome && nome.toLowerCase().includes(searchDestino.toLowerCase()))
      )
    ).slice(0, 10);

    setFilteredAirportsOrigem(uniqueAirportsOrigem);
    setFilteredAirportsDestino(uniqueAirportsDestino);
  }, [data, searchOrigem, searchDestino]);

  const handleClick = (voo: Voo) => {
    setSelectedVoo(voo);
  };

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-semibold text-center mb-6 text-blue-700">Linha do Tempo de Voos</h2>

      {/* Barra de busca para Origem e Destino */}
      <div className="flex justify-center gap-4 mb-6">
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Buscar por origem..."
            value={searchOrigem}
            onChange={(e) => {
              setSearchOrigem(e.target.value);
              setShowOrigemOptions(true);
              setPage(1);
            }}
            onBlur={() => setTimeout(() => setShowOrigemOptions(false), 200)}
            onFocus={() => setShowOrigemOptions(true)}
            className="p-2 border border-gray-300 rounded-lg w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
          />
          {showOrigemOptions && filteredAirportsOrigem.length > 0 && (
            <div className="absolute top-12 w-full max-h-40 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              {filteredAirportsOrigem.map((airport, index) => (
                <div
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                  onMouseDown={() => {
                    setSearchOrigem(airport);
                    setShowOrigemOptions(false);
                  }}
                >
                  {airport}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Buscar por destino..."
            value={searchDestino}
            onChange={(e) => {
              setSearchDestino(e.target.value);
              setShowDestinoOptions(true);
              setPage(1);
            }}
            onBlur={() => setTimeout(() => setShowDestinoOptions(false), 200)}
            onFocus={() => setShowDestinoOptions(true)}
            className="p-2 border border-gray-300 rounded-lg w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
          />
          {showDestinoOptions && filteredAirportsDestino.length > 0 && (
            <div className="absolute top-12 w-full max-h-40 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              {filteredAirportsDestino.map((airport, index) => (
                <div
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                  onMouseDown={() => {
                    setSearchDestino(airport);
                    setShowDestinoOptions(false);
                  }}
                >
                  {airport}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Filtro de mês */}
        <select
          value={selectedMonth}
          onChange={(e) => {
            setSelectedMonth(e.target.value);
            setPage(1);
          }}
          className="p-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
        >
          <option value="">Todos os meses</option>
          {[...Array(12)].map((_, index) => (
            <option key={index + 1} value={String(index + 1).padStart(2, "0")}>
              Mês {index + 1}
            </option>
          ))}
        </select>
      </div>

      {/* Exibição dos voos */}
      <div className="timeline flex overflow-x-auto space-x-4 px-4">
        {displayData.map((voo, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-4 rounded-lg cursor-pointer bg-blue-200 hover:bg-blue-300 shadow-md"
            onClick={() => handleClick(voo)}
          >
            ✈️
            <div className="inline-flex w-max">
              {voo.origem.sigla} ➔ {voo.destino.sigla}
            </div>
            <div className="p-2 bg-red-500 rounded-xl text-white">
              {voo.mes}/{voo.ano}
            </div>
            <Tooltip id={index.toString()} place="top">
              {voo.empresa}
            </Tooltip>
          </div>
        ))}
        <div ref={observerRef} className="w-1"></div>
      </div>

      {/* Modal aprimorado */}
      {selectedVoo && (
        <div className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl relative">
            <button
              onClick={() => setSelectedVoo(null)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition duration-300 text-xl font-bold"
            >
              ✖️
            </button>
            <h3 className="text-2xl font-bold mb-4 text-blue-700 text-center">{selectedVoo.empresa}</h3>
            <div className="grid grid-cols-2 gap-4 text-gray-700">
              <p>
                <strong>🛫 Origem:</strong> {selectedVoo.origem.nome}, {selectedVoo.origem.uf} -{" "}
                {selectedVoo.origem.regiao}
              </p>
              <p>
                <strong>🛬 Destino:</strong> {selectedVoo.destino.nome}, {selectedVoo.destino.uf} -{" "}
                {selectedVoo.destino.regiao}
              </p>
              <p>
                <strong>📏 Distância:</strong> {selectedVoo.distancia} km
              </p>
              <p>
                <strong>📦 Carga:</strong> {selectedVoo.carga} kg
              </p>
              <p>
                <strong>👤 Passageiros:</strong> {selectedVoo.passageiros}
              </p>
              <p>
                <strong>⛽ Combustível usado:</strong> {selectedVoo.combustivel} litros
              </p>
              <p>
                <strong>⏱️ Horas de Voo:</strong> {selectedVoo.horasVoada}
              </p>
              <p>
                <strong>📅 Data:</strong> {selectedVoo.mes}/{selectedVoo.ano}
              </p>
            </div>
            <p className="italic mt-4 text-center text-gray-700">{selectedVoo.curiosidade}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapaInterativoVoos;
