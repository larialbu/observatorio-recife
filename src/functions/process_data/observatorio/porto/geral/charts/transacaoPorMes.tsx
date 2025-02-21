// export const processAtracacoesPorMes = (atracacoes: any[], cargas: any[]) => {
//   // Lista de meses no formato que aparece nos dados
//   const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  
//   // Inicializa os dados processados com os meses do ano
//   const processedData = meses.map((mes) => ({
//     mes,
//     totalQTCarga: 0,
//     totalVLPesoCargaBruta: 0,
//   }));

//   // Filtra as cargas que possuem uma atracação correspondente
//   const cargasFiltradas = cargas.filter((carga) => 
//     atracacoes.some((atracacao) => +atracacao.IDAtracacao === +carga.IDAtracacao)
//   );

//   // Processa os dados agrupando por mês
//   cargasFiltradas.forEach((carga) => {
//     const qtCarga = parseInt(String(carga.QTCarga)?.replace(",", ".") || "0");
//     const vlPesoCargaBruta = parseInt(String(carga.VLPesoCargaBruta)?.replace(",", ".") || "0");
//     const atracacao = atracacoes.find((a) => +a.IDAtracacao === +carga.IDAtracacao);
    
//     if (atracacao) {
//       const mes = atracacao.Mes;
//       const mesIndex = meses.indexOf(mes);

//       if (mesIndex !== -1) {
//         processedData[mesIndex].totalQTCarga += qtCarga;
//         processedData[mesIndex].totalVLPesoCargaBruta += vlPesoCargaBruta;
//       }
//     }
//   });

//   return processedData;
// };

export const processAtracacoesPorMes = (atracacoes: any[], cargas: any[]) => {
  // Lista de meses no formato que aparece nos dados
  const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

  // Inicializa os dados processados com os meses do ano
  const processedData = meses.map((mes) => ({
    mes,
    totalVLPesoCargaBruta: 0,
    outrosCarga: 0,
    cabotagemCarga: 0,
    exportacaoCarga: 0,
    importacaoCarga: 0,
  }));

  // Filtra as cargas que possuem uma atracação correspondente
  const cargasFiltradas = cargas.filter((carga) =>
    atracacoes.some((atracacao) => +atracacao.IDAtracacao === +carga.IDAtracacao)
  );

  // Processa os dados agrupando por mês
  cargasFiltradas.forEach((carga) => {
    const vlPesoCargaBruta = parseInt(String(carga.VLPesoCargaBruta)?.replace(",", ".") || "0");
    const atracacao = atracacoes.find((a) => +a.IDAtracacao === +carga.IDAtracacao);

    if (atracacao) {
      const mes = atracacao.Mes;
      const mesIndex = meses.indexOf(mes);

      if (mesIndex !== -1) {
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
