import { PortoAtracacaoHeaders, PortoCargaHeaders } from "@/@types/observatorio/@fetch/porto";

export const processAtracacoesPorMes = (atracacoes: PortoAtracacaoHeaders[], cargas: PortoCargaHeaders[]) => {
  // Lista de meses no formato que queremos (abreviação)
  const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

  const processedData = Array(12).fill(null).map(() => ({
    mes: "",
    totalVLPesoCargaBruta: 0,
    outrosCarga: 0,
    cabotagemCarga: 0,
    exportacaoCarga: 0,
    importacaoCarga: 0,
  }));

  // Filtra as cargas que possuem uma atracação correspondente
  const cargasFiltradas = cargas.filter((carga) =>
    atracacoes.some((atracacao) => Number(atracacao.IDAtracacao) === Number(carga.IDAtracacao))
  );

  cargasFiltradas.forEach((carga) => {
    const vlPesoCargaBruta = carga.VLPesoCargaBruta || 0;
    const atracacao = atracacoes.find((a) => +a.IDAtracacao === +carga.IDAtracacao);

    if (atracacao) {
      const mes = atracacao.Mes;
      const mesIndex = mes - 1;

      if (mesIndex >= 0 && mesIndex < 12) {
        processedData[mesIndex].mes = meses[mesIndex];

        processedData[mesIndex].totalVLPesoCargaBruta += vlPesoCargaBruta;

        switch (carga["Tipo Operação da Carga"].toLowerCase()) {
          case "apoio":
          case "outros":
            processedData[mesIndex].outrosCarga += vlPesoCargaBruta;
            break;
          case "cabotagem":
            processedData[mesIndex].cabotagemCarga += vlPesoCargaBruta;
            break;
          case "longo curso exportação":
            processedData[mesIndex].exportacaoCarga += vlPesoCargaBruta;
            break;
          case "longo curso importação":
            processedData[mesIndex].importacaoCarga += vlPesoCargaBruta;
            break;
        }
      }
    }
  });

  return processedData;
};
