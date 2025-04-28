"use client";
import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processDesempregoTaxaCapital } from "@/functions/process_data/observatorio/empregos/desemprego/desempregoTaxaCapital";
import { capitaisCoordsDicts } from "@/utils/dicts/empregos/desemprego/capitaisCoordsDicts";

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
    label: string;
    value: number;
  };
};

type GeoJSON = {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
};

// function convertToGeoJSON(data: any[], selectedMonths: number[]): GeoJSON {
function convertToGeoJSON(data: any[]): any {
  if (!Array.isArray(data)) {
    console.error("A data deve ser um array.");
    return { type: "FeatureCollection", features: [] };
  }

  const quarter = data.reduce((acc: number, obj: any) => {
    const data = +obj['Trimestre'].split('º')[0]
    acc = acc <= data ? data : acc

    return acc
  }, 0)

    const dataFiltred = data.filter((obj: any) => +obj['Trimestre'].split('º')[0] == quarter)

    const capitalsData = processDesempregoTaxaCapital(dataFiltred)
    const chartData = capitalsData.map((obj) =>  {
        const coords = capitaisCoordsDicts[obj.label];
        if (!coords) {
          console.warn(`Coordenadas não encontradas para: ${obj.label}`);
          return null;
        }

       return ({ ...obj, ...capitaisCoordsDicts[obj['label']] })}).filter((obj) => obj!== null )

  return {
    type: "FeatureCollection",
    features: chartData.map((item) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [
          item.longitude,
          item.latitude,
        ],
      },
      properties: {
        label: item.label,
        value: item.value,
      },
    })),
  };
}

type CapitaisLocalizacaoProps = {
  data: any;
};

export default function CapitaisLocalizacao({ data }: CapitaisLocalizacaoProps) {
  console.log('DATa', data)

  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {

    if (!mapRef.current || !data['desemprego']) {
    // if (!mapRef.current || !data || !Array.isArray(data) || data.length < 2) {
      return;
    }

    // const portoData = data[0];
    // const selectedMonths = data[1];

    const map = L.map(mapRef.current).setView([-14.673, -51.260], 4); // Coordenadas iniciais e zoom

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution:
        `
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 614 614" preserveAspectRatio="xMidYMid meet">
            <g fill="#2c79c4">
            <path d="M276.3 514.5 c-51.3 -6.6 -95.3 -28 -136.1 -66 l-5.7 -5.3 3 -2.4 c1.7 -1.2 10.2 -8.6 19 -16.3 8.8 -7.7 16.8 -14.6 17.7 -15.3 1.4 -1.1 3.4 0.2 14.9 9.4 17 13.6 22.4 17.1 38.4 24.9 26.7 12.9 48.7 17.9 79 17.9 24.7 0 47 -4.2 68.4 -12.8 21.1 -8.5 32 -16 66.1 -46.2 12.9 -11.4 37.5 -32.9 54.5 -47.9 17.1 -14.9 36.1 -31.7 42.4 -37.3 6.3 -5.6 11.8 -10.2 12.3 -10.2 0.9 0 1.1 65.6 0.2 71.2 -0.6 3.3 -3.1 5.8 -25.2 25 -13.5 11.7 -31.3 27.2 -39.5 34.3 -28.7 25.1 -43.1 36.4 -55.7 43.9 -30.8 18.4 -58.3 28.1 -93.7 33.1 -13.1 1.8 -45.6 1.8 -60 0z"/>
            <path d="M35 404.6 l0.1 -41.6 3.2 -2.9 c22.9 -20.4 53.1 -46.9 72.8 -64.1 7.9 -6.9 22.5 -19.7 32.4 -28.5 32.8 -29.2 38.2 -33.5 39.8 -31.9 0.3 0.3 2.8 -2.8 5.6 -7 18.8 -27.9 42.6 -47.1 71.2 -57.6 37.7 -13.9 74.6 -11.2 110.9 8.2 18.5 9.8 36.2 25.1 47.2 40.8 6.8 9.6 15.2 26.4 17.8 35.8 1.3 4.5 2.6 8.2 3 8.2 0.6 0 6.8 -5.3 26 -22.4 6.3 -5.6 14.9 -13.1 19 -16.6 4.1 -3.5 12.2 -10.7 18 -16 5.8 -5.3 15.8 -14.3 22.4 -20 6.5 -5.8 20.9 -18.5 32 -28.3 l20.1 -17.7 0.5 12.7 c0.3 7.1 0.7 25.1 0.8 40.2 l0.3 27.3 -3.8 3.7 c-2.2 2 -11.5 10.3 -20.8 18.5 -9.4 8.2 -19.7 17.5 -23 20.5 -3.3 3.1 -16.1 14.4 -28.4 25.1 -19.9 17.3 -33.6 29.6 -61.5 54.9 -4.5 4 -9.6 8.2 -11.3 9.3 -1.8 1.1 -5.6 5.2 -8.4 9.1 -20.2 28 -48.8 48.3 -78.8 55.8 -21.6 5.5 -40.3 6.1 -62.1 2 -25.3 -4.8 -41.1 -12.4 -62.7 -30.4 -19.3 -16.1 -32.9 -36.3 -41.1 -61 -1.4 -4.3 -2.9 -7.6 -3.3 -7.5 -0.9 0.4 -29.3 25.6 -41.4 36.9 -12.7 11.8 -84.1 75.6 -93.2 83.2 l-3.3 2.9 0 -41.6z"/>
            <path d="M63 243.7 l0 -36.5 9.3 -8.4 c5 -4.6 14.2 -12.6 20.2 -17.8 10.3 -8.9 21.2 -18.4 50 -44 23.9 -21.1 32.5 -27.4 52.6 -37.9 24.9 -13.1 53.4 -22.3 79.2 -25.6 13.8 -1.8 44.7 -2 59.8 -0.4 30.9 3.1 67.3 15.6 95.9 32.9 13.1 7.9 46.6 33.8 47.8 36.9 0.1 0.4 -3.5 3.9 -8 7.8 -4.6 3.8 -14.1 12 -21.2 18.2 -7.1 6.1 -13.3 11.1 -13.7 11.1 -0.3 0 -3.7 -2.5 -7.5 -5.6 -30.8 -25.3 -60.4 -40 -92.5 -46 -14.7 -2.8 -44.8 -2.6 -59.9 0.5 -30.2 6 -61 20.2 -82.5 38.1 -11 9.1 -46 39.5 -58.7 50.8 -4.7 4.2 -15.7 14 -24.5 21.7 -8.7 7.6 -21.8 19.3 -29.1 25.9 -7.3 6.5 -14.1 12.6 -15.2 13.3 -2 1.4 -2 1.2 -2 -35z"/>
            </g>
            <g fill="#8bb956">
            <path d="M35 404.6 l0.1 -41.6 3.2 -2.9 c22.9 -20.4 53.1 -46.9 72.8 -64.1 7.9 -6.9 22.5 -19.7 32.4 -28.5 33.5 -29.8 35.2 -31.2 39.3 -32 l2.1 -0.4 -1.8 4.7 c-1.1 2.6 -3.3 8.3 -5.1 12.7 -3.7 9.3 -5.5 18.2 -6.5 31.8 l-0.7 9.7 34.5 0 34.5 0 0.7 -6.7 c2.2 -21.1 16 -41.1 34.5 -50.1 8.4 -4.1 21.9 -8.2 27 -8.2 2.5 0 2.8 -0.4 3.4 -5.2 0.3 -2.9 0.6 -18 0.6 -33.5 l0 -28.3 4.3 0 c6.5 0 23.4 2.7 30.7 4.9 16.9 4.9 33.7 13.1 47.5 23.1 9.4 6.8 23.2 20.8 29.7 30 6.8 9.6 15.2 26.4 17.8 35.8 1.3 4.5 2.6 8.2 3 8.2 0.6 0 6.8 -5.3 26 -22.4 6.3 -5.6 14.9 -13.1 19 -16.6 4.1 -3.5 12.2 -10.7 18 -16 5.8 -5.3 15.8 -14.3 22.4 -20 6.5 -5.8 20.9 -18.5 32 -28.3 l20.1 -17.7 0.5 12.7 c0.3 7.1 0.7 25.1 0.8 40.2 l0.3 27.3 -3.8 3.7 c-2.2 2 -11.5 10.3 -20.8 18.5 -9.4 8.2 -19.7 17.5 -23 20.5 -3.3 3.1 -16.1 14.4 -28.4 25.1 -20 17.4 -30.1 26.4 -62 55.3 -4.7 4.3 -9.9 8.5 -11.4 9.3 l-2.8 1.5 1.7 -3.8 c9.6 -22.4 12.6 -33.9 13.6 -52.8 l0.2 -5 -35 -0.3 -35.1 -0.2 -0.6 6.3 c-1.2 12.6 -7.9 27 -17.1 36.5 -11 11.6 -27.4 20 -41.9 21.7 l-5.7 0.7 -0.2 22.7 c-0.1 12.4 -0.2 27 -0.2 32.5 l-0.1 9.8 -7.6 -0.6 c-25.1 -2.1 -46 -8.7 -63.3 -19.9 -29.3 -19.2 -48.2 -43.1 -58.4 -74 -1.4 -4.3 -2.9 -7.6 -3.3 -7.5 -0.9 0.4 -29.3 25.6 -41.4 36.9 -12.7 11.8 -84.1 75.6 -93.2 83.2 l-3.3 2.9 0 -41.6z"/>
            </g>
            <g fill="#eb7a4a">
            <path d="M35 404.6 l0.1 -41.6 3.2 -2.9 c22.9 -20.4 53.1 -46.9 72.8 -64.1 7.9 -6.9 22.5 -19.7 32.4 -28.5 33.5 -29.8 35.2 -31.2 39.3 -32 l2.1 -0.4 -2 5.2 c-6.8 16.9 -8.8 23 -9.9 29.7 -1.5 8.9 -1.8 30.9 -0.7 43.5 l0.9 9.1 -17.3 15.4 c-9.6 8.5 -21 18.9 -25.4 23 -11.2 10.5 -83.3 74.9 -92.2 82.3 l-3.3 2.9 0 -41.6z"/>
            <path d="M297.5 359 c-22.2 -3.1 -45.7 -20.9 -52.3 -39.3 -4.7 -13.5 -6 -33.8 -2.8 -43.2 6.5 -18.5 17.7 -32 32.6 -39.3 11.8 -5.8 23.4 -8.6 31.9 -7.7 23.6 2.3 44.8 15.2 55.7 33.8 6.4 10.7 7.4 14.8 7.6 30.6 0.2 12.1 0 14.3 -2.1 20 -11 30.1 -41.1 49.3 -70.6 45.1z"/>
            <path d="M427.6 353.3 c8.1 -18.9 10.6 -27 12.3 -39.8 2 -16 2.1 -23.1 0.6 -35 -0.8 -6.6 -1.5 -12.5 -1.5 -13.1 0 -0.5 4.1 -4.6 9.2 -9 5.1 -4.3 13.7 -12 19.3 -16.9 5.5 -5 13.2 -11.7 17 -15 3.9 -3.2 11.7 -10.2 17.5 -15.5 5.8 -5.3 15.8 -14.3 22.4 -20 6.5 -5.8 20.9 -18.5 32 -28.3 l20.1 -17.7 0.5 12.7 c0.3 7.1 0.7 25.1 0.8 40.2 l0.3 27.3 -3.8 3.7 c-2.2 2 -11.5 10.3 -20.8 18.5 -9.4 8.2 -19.7 17.5 -23 20.5 -3.3 3.1 -16.1 14.4 -28.4 25.1 -20 17.4 -30.1 26.4 -62 55.3 -4.7 4.3 -9.9 8.5 -11.4 9.3 l-2.8 1.5 1.7 -3.8z"/>
            </g>
        </svg>
        Observatório Econômico do Recife`,
    }).addTo(map);

    const geoJsonData = convertToGeoJSON(data['desemprego']);
    console.log('GeoJSONData', geoJsonData)
    // const geoJsonData = convertToGeoJSON(portoData, selectedMonths);

    L.geoJSON(geoJsonData, {
      pointToLayer: (feature, latlng) => {
        const fillColor = feature.properties.label === "Recife-PE" ? "red" : ColorPalette.default[1];
        const { label, value } = feature.properties;

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
            <h3 style="margin: 0; color: #0077cc; font-size: 17px;">⚓ ${label}</h3>
            <hr style="border: 0; height: 1px; background: #ddd; margin: 8px 0;">
            <p style="margin: 0; font-size: 14px;"><strong>Carga:</strong></p>
            <p style="margin: 0; font-size: 13px; font-weight: bold; color: #333;">${value} (ton)</p>
          </div>
        `);

        return circleMarker;
      },
    }).addTo(map);

    return () => {
      map.remove();
    };

//   }, [data?.[0], data?.[1]]);
}, []);

// const dataDesemprego = data['desemprego']

  return (
    <div className="w-full h-full">
      <div className="flex w-full justify-center mb-2 text-lg">
        <strong>Taxa das capitais por Localização</strong>
      </div>
      <div ref={mapRef} style={{ height: "500px", width: "100%" }} />
    </div>
  );
}
