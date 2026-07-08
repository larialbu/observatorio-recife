"use client";
import React, { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const UF_POR_CODIGO: Record<string, string> = {
  "11": "RO", "12": "AC", "13": "AM", "14": "RR", "15": "PA", "16": "AP", "17": "TO",
  "21": "MA", "22": "PI", "23": "CE", "24": "RN", "25": "PB", "26": "PE", "27": "AL", "28": "SE", "29": "BA",
  "31": "MG", "32": "ES", "33": "RJ", "35": "SP",
  "41": "PR", "42": "SC", "43": "RS",
  "50": "MS", "51": "MT", "52": "GO", "53": "DF",
};

const LIMITES_BRASIL: L.LatLngBoundsExpression = [
  [-35, -75], // sudoeste
  [7, -32], // nordeste
];

type BrazilCapagMapProps = {
  municipioSelecionado?: string | null;
  onSelectMunicipio: (municipio: string, uf: string) => void;
};

export default function BrazilCapagMap({ municipioSelecionado, onSelectMunicipio }: BrazilCapagMapProps) {
  const mapDivRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const estadosLayerRef = useRef<L.GeoJSON | null>(null);
  const municipiosLayerRef = useRef<L.GeoJSON | null>(null);
  const [ufAtivo, setUfAtivo] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  const voltarParaEstados = () => {
    if (municipiosLayerRef.current && mapRef.current) {
      mapRef.current.removeLayer(municipiosLayerRef.current);
      municipiosLayerRef.current = null;
    }
    if (estadosLayerRef.current) {
      estadosLayerRef.current.setStyle(estiloEstadoPadrao);
    }
    mapRef.current?.setView([-14.673, -51.26], 4);
    setUfAtivo(null);
  };

  const estiloEstadoPadrao = { color: "#0155AE", weight: 1, fillColor: "#0155AE", fillOpacity: 0.25 };
  const estiloEstadoHover = { color: "#0155AE", weight: 2, fillColor: "#0155AE", fillOpacity: 0.45 };

  const carregarMunicipios = async (codigoUf: string, sigla: string, layer: L.Layer) => {
    setCarregando(true);
    try {
      const [geoRes, nomesRes] = await Promise.all([
        fetch(`https://servicodados.ibge.gov.br/api/v3/malhas/estados/${codigoUf}?formato=application/vnd.geo+json&intrarregiao=municipio`),
        fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${codigoUf}/municipios`),
      ]);
      const geo = await geoRes.json();
      const nomes: { id: number; nome: string }[] = await nomesRes.json();
      const nomeById = new Map(nomes.map((m) => [String(m.id), m.nome]));

      if (municipiosLayerRef.current && mapRef.current) {
        mapRef.current.removeLayer(municipiosLayerRef.current);
      }

      const municipiosLayer = L.geoJSON(geo, {
        style: (feature) => {
          const nome = nomeById.get(feature?.properties?.codarea) ?? "";
          const isRecife = nome === "Recife" && sigla === "PE";
          return {
            color: "#fff",
            weight: 1,
            fillColor: isRecife ? "#EC6625" : "#0155AE",
            fillOpacity: isRecife ? 0.8 : 0.35,
          };
        },
        onEachFeature: (feature, l) => {
          const nome = nomeById.get(feature?.properties?.codarea) ?? "Município";
          l.bindTooltip(nome, { sticky: true, direction: "top" });
          l.on("mouseover", () => (l as L.Path).setStyle({ fillOpacity: 0.7 }));
          l.on("mouseout", () => municipiosLayer.resetStyle(l as L.Path));
          l.on("click", () => onSelectMunicipio(nome, sigla));
        },
      });

      municipiosLayer.addTo(mapRef.current!);
      municipiosLayerRef.current = municipiosLayer;
      mapRef.current?.fitBounds(municipiosLayer.getBounds());
      mapRef.current?.removeLayer(layer);
      setUfAtivo(sigla);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    if (!mapDivRef.current || mapRef.current) return;

    let cancelado = false;

    const map = L.map(mapDivRef.current, {
      minZoom: 4,
      maxBounds: LIMITES_BRASIL,
      maxBoundsViscosity: 1.0,
    }).setView([-14.673, -51.26], 4);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: "Observatório Econômico do Recife",
    }).addTo(map);

    fetch("/geo/brasil-estados.geojson")
      .then((res) => res.json())
      .then((geo) => {
        // O efeito pode ter sido desmontado (StrictMode/Fast Refresh) enquanto
        // o fetch estava em andamento, destruindo "map" — não mexer nele nesse caso.
        if (cancelado) return;

        const estadosLayer = L.geoJSON(geo, {
          style: estiloEstadoPadrao,
          onEachFeature: (feature, layer) => {
            const codigo = feature?.properties?.codarea;
            const sigla = UF_POR_CODIGO[codigo] ?? codigo;
            layer.bindTooltip(sigla, { sticky: true, direction: "top" });
            layer.on("mouseover", () => (layer as L.Path).setStyle(estiloEstadoHover));
            layer.on("mouseout", () => estadosLayer.resetStyle(layer as L.Path));
            layer.on("click", () => carregarMunicipios(codigo, sigla, estadosLayer));
          },
        });
        estadosLayer.addTo(map);
        estadosLayerRef.current = estadosLayer;
      });

    return () => {
      cancelado = true;
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-full">
      <div className="flex w-full justify-between items-center mb-2">
        <strong className="text-lg">Selecione um município para comparar</strong>
        {ufAtivo && (
          <button
            onClick={voltarParaEstados}
            className="text-sm px-3 py-1 rounded-md bg-[#0155AE] text-white hover:opacity-90"
          >
            ← Voltar aos estados
          </button>
        )}
      </div>
      {municipioSelecionado && (
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          Comparando com: <strong>{municipioSelecionado}</strong>
        </p>
      )}
      {carregando && <p className="text-sm text-gray-400 mb-2">Carregando municípios...</p>}
      <div ref={mapDivRef} style={{ height: "500px", width: "100%" }} />
    </div>
  );
}
