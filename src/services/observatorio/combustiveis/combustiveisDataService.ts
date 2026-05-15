import { readCombustiveisData } from "./readCombustiveisData";
import { processCombustiveisGeral } from "@/functions/process_data/observatorio/combustiveis/geral/combustiveisGeral";

type CombustiveisFilters = {
  year?: string;
  ano?: string;
  produto?: string;
  estado?: string;
  municipio?: string;
  regiao?: string;
  month?: string;
  months?: string | string[];
  mes?: string;
  meses?: string | string[];
};

export async function getCombustiveisGeralData(
  filters: CombustiveisFilters = {}
) {
  const data = await readCombustiveisData();

  return processCombustiveisGeral(data, {
    year: filters.year || filters.ano || "2024",
    produto: filters.produto || "Gasolina Comum",
    estado: filters.estado || "Todos",
    municipio: filters.municipio || "Todos",
    regiao: filters.regiao || "",
    month: filters.month,
    months: filters.months,
    mes: filters.mes,
    meses: filters.meses,
  });
}

export default getCombustiveisGeralData;