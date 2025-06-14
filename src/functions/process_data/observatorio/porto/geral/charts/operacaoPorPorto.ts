// import { PortoMesData } from "@/@types/observatorio/@fetch/porto";

interface portoResult {
  porto: string;
  carga: number;
}
  
export function processCargasPorPorto(array: any[]): portoResult[] { //no any era o PortoMesData
  const result: portoResult[] = [];

  array.forEach(item => {
    const portoExists = result.find(p => p.porto === item["Porto Atracação"]);
    
    if (portoExists) {
      // Se o porto já existir no result, soma o peso da carga
      portoExists.carga += item.VLPesoCargaBruta;
    } else {
      // Se o porto não existir, cria um novo objeto para o porto
      result.push({
        porto: item["Porto Atracação"],
        carga: item.VLPesoCargaBruta
      });
    }
  });

  return result.sort((a, b) => b.carga - a.carga);
}
  