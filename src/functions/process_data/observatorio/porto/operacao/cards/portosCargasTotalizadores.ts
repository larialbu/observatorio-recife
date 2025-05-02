import { PortoAtracacaoHeaders, PortoCargaHeaders } from "@/@types/observatorio/@fetch/porto";

export const processarCargasPorTipo = (atracacoes: PortoAtracacaoHeaders[], cargas: PortoCargaHeaders[]) => {
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
