"use client";
import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

type PortoData = {
  Longitude: string;
  Latitude: string;
  "Porto Atracação": string;
  Mes: number;
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
    vlPesoCargaBruta: number;
  };
};

type GeoJSON = {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
};

function convertToGeoJSON(data: PortoData[], selectedMonths: number[]): GeoJSON {
  if (!Array.isArray(data)) {
    console.error("A data deve ser um array.");
    return { type: "FeatureCollection", features: [] };
  }

  const filteredData = selectedMonths.length > 0
    ? data.filter((item) => selectedMonths.includes(item.Mes))
    : data;

  const aggregatedData: { [key: string]: PortoData } = {};

  filteredData.forEach((item) => {
    const key = item["Porto Atracação"];

    if (!aggregatedData[key]) {
      aggregatedData[key] = { ...item };
    } else {

      aggregatedData[key].VLPesoCargaBruta += item.VLPesoCargaBruta;
    }
  });

  const aggregatedDataArray = Object.values(aggregatedData);

  return {
    type: "FeatureCollection",
    features: aggregatedDataArray.map((item) => ({
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
        vlPesoCargaBruta: item.VLPesoCargaBruta,
      },
    })),
  };
}

type PortoLocalizacaoProps = {
  data: [PortoData[], { label: string; options: number[]; selected: number[] }];
};

export default function PortoLocalizacao({ data }: PortoLocalizacaoProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {

    if (!mapRef.current || !data || !Array.isArray(data) || data.length < 2) {
      console.error("Os dados estão ausentes ou na estrutura incorreta.");
      return;
    }

    const portoData = data[0];
    const selectedMonths = data[1].selected;

    const map = L.map(mapRef.current).setView([-14.673, -51.260], 4);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    const geoJsonData = convertToGeoJSON(portoData, selectedMonths);

    L.geoJSON(geoJsonData, {
      pointToLayer: (feature, latlng) => {
        const fillColor = feature.properties.name === "Recife" ? "red" : ColorPalette.default[1];
        const { coordinates } = feature.geometry;
        const { name, vlPesoCargaBruta } = feature.properties;

        const circleMarker = L.circleMarker(latlng, {
          radius: 8,
          fillColor,
          color: "#000",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8,
        });

        circleMarker.bindPopup(`
          <div>
            <h3 style="margin: 0; color: #0077cc; font-size: 17px;">⚓ ${name}</h3>
            <hr style="border: 0; height: 1px; background: #ddd; margin: 8px 0;">
            <p style="margin: 0; font-size: 14px;"><strong>Carga:</strong></p>
            <p style="margin: 0; font-size: 13px; font-weight: bold; color: #333;">${vlPesoCargaBruta} (ton)</p>
          </div>
        `);

        return circleMarker;
      },
    }).addTo(map);

    return () => {
      map.remove();
    };
  }, [data[1]?.selected]);

  return <div ref={mapRef} style={{ height: "500px", width: "100%" }} />;
}
