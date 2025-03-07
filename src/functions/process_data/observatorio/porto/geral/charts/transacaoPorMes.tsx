export const processAtracacoesPorMes = (atracacoes: any[], cargas: any[]) => {
  // Lista de meses no formato que queremos (abreviação)
  const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

  // Inicializa os dados processados com os meses do ano (1 a 12)
  const processedData = Array(12).fill(null).map(() => ({
    mes: "",  // Agora mes será uma string (ex: "Jan", "Fev", "Mar")
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

  // Processa os dados agrupando por mês
  cargasFiltradas.forEach((carga) => {
    const vlPesoCargaBruta = carga.VLPesoCargaBruta || 0;
    const atracacao = atracacoes.find((a) => +a.IDAtracacao === +carga.IDAtracacao);

    if (atracacao) {
      const mes = atracacao.Mes; // Mes é um número entre 1 e 12
      const mesIndex = mes - 1; // Convertendo para índice do array (0 a 11)

      if (mesIndex >= 0 && mesIndex < 12) {
        // Armazenando o nome do mês (Jan, Fev, Mar, ...)
        processedData[mesIndex].mes = meses[mesIndex];

        // Acumulando o peso da carga
        processedData[mesIndex].totalVLPesoCargaBruta += vlPesoCargaBruta;

        // Classifica as cargas por tipo de operação
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
