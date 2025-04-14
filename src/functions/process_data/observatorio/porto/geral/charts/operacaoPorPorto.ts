interface Porto {
    "Porto Atracação": string;
    Mes: number;
    VLPesoCargaBruta: number;
  }
  
  interface ResultadoPorto {
    porto: string;
    carga: number;
  }
  
 export function processCargasPorPorto(array: Porto[]): ResultadoPorto[] {
    const resultado: ResultadoPorto[] = [];
  
    // Itera sobre o array e acumula os valores das cargas por porto
    array.forEach(item => {
      const portoExistente = resultado.find(p => p.porto === item["Porto Atracação"]);
      
      if (portoExistente) {
        // Se o porto já existir no resultado, soma o peso da carga
        portoExistente.carga += item.VLPesoCargaBruta;
      } else {
        // Se o porto não existir, cria um novo objeto para o porto
        resultado.push({
          porto: item["Porto Atracação"],
          carga: item.VLPesoCargaBruta
        });
      }
    });
  
    return resultado.sort((a, b) => b.carga - a.carga);
  }
  