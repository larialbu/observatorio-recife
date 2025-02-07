export const processAtracacoesPorMes = (atracacoes: any[], cargas: any[]) => {
    // Filtra as cargas que possuem uma atracação correspondente
    const cargasFiltradas = cargas.filter((carga) => 
      atracacoes.some((atracacao) => atracacao.IDAtracacao === carga.IDAtracacao)
    );
  
    // Inicializa os dados processados com os meses do ano
    const meses = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
    const processedData = meses.map((mes) => ({
      mes,
      totalQTCarga: 0,
      totalVLPesoCargaBruta: 0,
    }));
  
    // Processa os dados agrupando por mês
    cargasFiltradas.forEach((carga) => {
      const qtCarga = parseFloat(carga.QTCarga?.replace(",", ".") || "0");
      const vlPesoCargaBruta = parseFloat(carga.VLPesoCargaBruta?.replace(",", ".") || "0");
      const atracacao = atracacoes.find((a) => a.IDAtracacao === carga.IDAtracacao);
      
      if (atracacao) {
        const mes = atracacao.Mes;
        const mesIndex = meses.indexOf(mes);
        if (mesIndex !== -1) {
          processedData[mesIndex].totalQTCarga += qtCarga;
          processedData[mesIndex].totalVLPesoCargaBruta += vlPesoCargaBruta;
        }
      }
    });
  
    // Formata os meses para exibição amigável
    return processedData.map((item) => ({
      ...item,
      mes: new Date(0, parseInt(item.mes, 10) - 1).toLocaleString("pt-BR", {
        month: "short",
      }),
    }));
  };
  