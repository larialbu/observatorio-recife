export const processCargasPorNatureza = (data: any[]) => {

  return data.reduce((acc: any, item: any) => {

    const natureza = item["NATUREZA"] || "Indefinida";
    
    const carga = parseFloat(
      (item["CARGA"] || "0")
    );

    if (!acc[natureza]) {
      acc[natureza] = { natureza, total: 0 };
    }

    acc[natureza].total += carga

    return acc;
  }, {});
};

export const prepareCargasPorNaturezaData = (data: any[]) => {
  const processed = processCargasPorNatureza(data); // Processa os dados diretamente
  return Object.values(processed); // Transforma o objeto em array para uso no gráfico
};
