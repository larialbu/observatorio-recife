import { IpcaGrupoHeaders } from "@/@types/observatorio/@fetch/ipca";

export const processPercentageByType = (
    data: IpcaGrupoHeaders[],
    type: "grupo" | "subgrupo" | "item" | "subitem"
  ) => {

    const key = {
      grupo: "Grupo",
      subgrupo: "Subgrupo",
      item: "Item",
      subitem: "SubItem",
    }[type];
  
    const processedData = data.reduce((acc: { [groupKey: string]: {key: {[key: string]: string}, totalIndice: number} }, item: any) => {
      const groupKey = item[key] || "Indefinido";
      const indice = parseFloat((item["Indice"] || "0"));
  
      if (!acc[groupKey]) {
        acc[groupKey] = { 
          key: groupKey, 
          totalIndice: 0 
        };
      }
  
      acc[groupKey].totalIndice += indice;
  
      return acc;
    }, {});
  
    const totalGeralIndice = Object.values(processedData).reduce(
      (total: number, group) => total + group.totalIndice,
      0
    );
  
    return Object.values(processedData)
      .map((group) => ({
        [type]: group.key,
        porcentagem: (group.totalIndice / totalGeralIndice) * 100,
      }))
      .sort(
        (a, b) => b.porcentagem - a.porcentagem
      );
  };
  