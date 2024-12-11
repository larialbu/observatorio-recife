import { ComercioExterior } from "../../../components/observatorio/balancaComercial/types/Comerce";

export function getMunicipios(jsonData: ComercioExterior[]): string[] {
  // Utiliza um Set para armazenar os nomes dos municípios sem repetição
  const municipiosSet = new Set<string>();

  // Itera sobre o array para adicionar cada município ao Set
  jsonData.forEach((item) => {
    municipiosSet.add(item.Município);
  });

  // Converte o Set para um array e retorna
  return Array.from(municipiosSet);
}
