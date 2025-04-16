import { AnacGeralHeaders } from "@/@types/observatorio/@fetch/aeroporto";

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
  data: AnacGeralHeaders[],
  nameKey: string,
  windowWidth: number
) => {
  const processedData = data.reduce((
    acc: Record<string, { [k: string]: string | number }>,
    item: AnacGeralHeaders
  ) => {
    let key = (item[nameKey as keyof AnacGeralHeaders] || "").toString().trim().toUpperCase();
    const tipo = item["TIPO"];
    const passageiros = item["PASSAGEIRO"] || 0;
  
    key = abbreviateRegion(key, windowWidth);
  
    if (!acc[key]) {
      acc[key] = {
        [nameKey]: key,
        embarque: 0,
        desembarque: 0
      };
    }
  
    if (tipo === "Embarque") {
      acc[key].embarque = (acc[key].embarque as number) + passageiros;
    } else if (tipo === "Desembarque") {
      acc[key].desembarque = (acc[key].desembarque as number) + passageiros;
    }
  
    return acc;
  }, {});
  

  return Object.values(processedData);
};
