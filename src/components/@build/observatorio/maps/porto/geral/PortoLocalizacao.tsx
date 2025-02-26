"use client";
import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

type PortoData = {
  Longitude: string;
  Latitude: string;
  "Porto Atracação": string;
  VLPesoCargaBruta: number;
};

type GeoJSONFeature = {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  properties: {
    name: string;
    qtCarga: number;
  };
};

type GeoJSON = {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
};

// Função para converter JSON em GeoJSON
function convertToGeoJSON(data: PortoData[]): GeoJSON {
  if (!Array.isArray(data)) {
    console.error("A data deve ser um array.");
    return { type: "FeatureCollection", features: [] };
  }
  return {
    type: "FeatureCollection",
    features: data.map((item) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [
          parseFloat(item.Longitude.replace(",", ".")),
          parseFloat(item.Latitude.replace(",", ".")),
        ],
      },
      properties: {
        name: item["Porto Atracação"],
        qtCarga: parseInt(item.VLPesoCargaBruta as any),
      },
    })),
  };
}

type PortoLocalizacaoProps = {
  data: PortoData[];
};

export default function PortoLocalizacao({ data }: PortoLocalizacaoProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Remove qualquer mapa existente antes de criar um novo
    if ((mapRef.current as any)._leaflet_id) {
      mapRef.current.innerHTML = "";
    }

    // Inicializa o mapa
    const map = L.map(mapRef.current).setView([-14.673, -51.260], 4); // Coordenadas iniciais e zoom

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    const geoJsonData = convertToGeoJSON(data);

    L.geoJSON(geoJsonData, {
      pointToLayer: (feature, latlng) => {
        const fillColor = feature.properties.name === "Recife" ? "red" : ColorPalette.default[1];
        const { coordinates } = feature.geometry;
        const { name, qtCarga } = feature.properties;

        const circleMarker = L.circleMarker(latlng, {
          radius: 8,
          fillColor,
          color: "#000",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8,
        });

        // Adiciona o balão de informação ao círculo
        circleMarker.bindPopup(`
          <div
          ">
            <h3 style="margin: 0; color: #0077cc; font-size: 17px;">⚓ ${name}</h3>
            <hr style="border: 0; height: 1px; background: #ddd; margin: 8px 0;">
            <p style="margin: 0; font-size: 14px;"><strong>Carga:</strong></p>
            <p style="margin: 0; font-size: 13px; font-weight: bold; color: #333;">${qtCarga} (ton)</p>
          </div>
        `);

        return circleMarker;
      },
    }).addTo(map);

    return () => {
      map.remove();
    };
  }, [data]);

  return <div ref={mapRef} style={{ height: "500px", width: "100%" }} />;
}
