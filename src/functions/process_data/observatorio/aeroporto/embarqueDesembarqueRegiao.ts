import { formatNumber } from "@/utils/formatters/@global/numberFormatter";

// Abrevia regiões com base na largura da tela
const abbreviateRegion = (region: string, windowWidth: number): string => {
  const abbreviations: { [key: string]: string } = {
    NORTE: "N",
    NORDESTE: "NE",
    "CENTRO-OESTE": "CO",
    SUDESTE: "SE",
    SUL: "S",
  };

  if ((windowWidth >= 768 && windowWidth <= 1120) || windowWidth < 600) {
    return abbreviations[region] || region;
  }

  return region;
};

export const processEmbarqueDesembarque = (
  data: any[],
  nameKey: string,
  windowWidth: number
) => {
  const processedData = data.reduce((acc: any, item: any) => {
    let key = (item[nameKey] || "").trim().toUpperCase();
    const tipo = item["TIPO"];
    const passageiros = parseFloat(
      (item["PASSAGEIRO"] || "0").replace(/\./g, "").replace(",", ".")
    );

    key = abbreviateRegion(key, windowWidth);

    if (!acc[key]) {
      acc[key] = { [nameKey]: key, embarque: 0, desembarque: 0 };
    }

    if (tipo === "Embarque") {
      acc[key].embarque += passageiros;
    } else if (tipo === "Desembarque") {
      acc[key].desembarque += passageiros;
    }

    return acc;
  }, {});

  return Object.values(processedData);
};

