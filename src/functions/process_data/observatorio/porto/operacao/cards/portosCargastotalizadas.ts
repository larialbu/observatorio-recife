export const portosCargastotalizadas = (atracacoes: any[], cargas: any[]) => {
    // Inicializa um objeto para armazenar as somas por tipo de operação
    const operacoesSoma: any = {
      total: {
        operacao: "total", // Nome para o total geral
        QTCarga: 0,
        VLPesoCargaBruta: 0,
      }
    };
  
    // Itera sobre as cargas e soma os dados por operação
    cargas.forEach((carga: any) => {
      // Encontra a atracação correspondente com base no IDAtracacao
      const atracacao = atracacoes.find((atracacao: any) => atracacao.IDAtracacao === carga.IDAtracacao);
  
    //   if (atracacao) {
        const tipoOperacao = carga["Tipo Operação da Carga"].toLowerCase(); // Obtém o tipo de operação
  
        // Verifica se o tipo de operação já existe em operacoesSoma, se não, inicializa
        if (!operacoesSoma[tipoOperacao]) {
          operacoesSoma[tipoOperacao] = {
            operacao: tipoOperacao,
            QTCarga: 0,
            VLPesoCargaBruta: 0,
          };
        }
  
        // Soma a quantidade de carga e peso bruto por tipo de operação
        operacoesSoma[tipoOperacao].QTCarga += parseInt(carga.QTCarga || "0");
        operacoesSoma[tipoOperacao].VLPesoCargaBruta += parseInt(carga.VLPesoCargaBruta || "0");
  
        // Soma os totais gerais (sem distinção de operação)
        operacoesSoma.total.QTCarga += parseInt(carga.QTCarga || "0");
        operacoesSoma.total.VLPesoCargaBruta += parseInt(carga.VLPesoCargaBruta || "0");
    //   }
    }
);
  
    // Retorna um array com o formato desejado
    return Object.values(operacoesSoma);
  };
  