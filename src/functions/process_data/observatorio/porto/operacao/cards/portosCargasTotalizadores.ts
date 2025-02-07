// type Atracacao = {
//     IDAtracacao: string;
//     Mes: string;
//   };
  
//   type Carga = {
//     IDAtracacao: string;
//     "Tipo Operação da Carga": string;
//     "Tipo Navegação": string;
//     VLPesoCargaBruta: string;
//   };
  
  export const processarCargasPorTipo = (atracacoes: any[], cargas: any[]) => {
    // Filtra as cargas que possuem uma atracação correspondente
    const cargasFiltradas = cargas?.filter((carga) =>
      atracacoes.some((atracacao) => +atracacao.IDAtracacao === +carga.IDAtracacao)
    );
  
    // Inicializa os valores acumulados
    let movimentacao = 0;
    let importacao = 0;
    let exportacao = 0;
    let cabotagem = 0;
    let outros = 0;
  
    // Processa os dados
    cargasFiltradas.forEach((carga) => {
      const vlPesoCargaBruta = parseInt(String(carga.VLPesoCargaBruta)?.replace(",", ".") || "0");
      movimentacao += vlPesoCargaBruta;
  
      // Classifica a carga
      const operacao = carga["Tipo Operação da Carga"].toLowerCase();
      const navegacao = carga["Tipo Navegação"].toLowerCase();
  
      if (operacao.includes("import")) {
        importacao += vlPesoCargaBruta;
      } else if (operacao.includes("export")) {
        exportacao += vlPesoCargaBruta;
      } else if (navegacao.includes("cabotagem")) {
        cabotagem += vlPesoCargaBruta;
      } else {
        outros += vlPesoCargaBruta;
      }
    });
  
    return { movimentacao, importacao, exportacao, cabotagem, outros };
  };
  


//   type Atracacao = {
//     IDAtracacao: string;
//   };
  
//   type Carga = {
//     IDAtracacao: string;
//     "Tipo Operação da Carga": string;
//     "Tipo Navegação": string;
//     VLPesoCargaBruta: string;
//     QTCarga: string;
//   };
  
//   export const processarCargasPorTipo = (atracacoes: any[], cargas: any[]) => {
//     // Filtra as cargas que possuem uma atracação correspondente
//     const cargasFiltradas = cargas?.filter((carga) =>
//       atracacoes.some((atracacao) => +atracacao.IDAtracacao === +carga.IDAtracacao)
//     );
  
//     // Inicializa um objeto para armazenar os dados dinamicamente
//     const resultado: Record<string, { totalPeso: number; totalQuantidade: number }> = {};
  
//     // Processa os dados
//     cargasFiltradas.forEach((carga) => {
//       const vlPesoCargaBruta = parseInt(String(carga.VLPesoCargaBruta)?.replace(",", ".") || "0");
//       const qtCarga = parseInt(carga.QTCarga || "0", 10);
  
//       // Obtém o nome do tipo de operação
//       const tipoOperacao = carga["Tipo Operação da Carga"].toLowerCase();
  
//       // Se não existir no objeto, inicializa com valores zerados
//       if (!resultado[tipoOperacao]) {
//         resultado[tipoOperacao] = { totalPeso: 0, totalQuantidade: 0 };
//       }
  
//       // Acumula os valores
//       resultado[tipoOperacao].totalPeso += vlPesoCargaBruta;
//       resultado[tipoOperacao].totalQuantidade += qtCarga;
//     });
  
//     return resultado;
//   };
  