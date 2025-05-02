import { PortoCargaHeaders } from "@/@types/observatorio/@fetch/porto";

interface OperacaoCargaTotal {
  operacao: string;
  VLPesoCargaBruta: number;
}

export const portosCargastotalizadas = (
  cargas: PortoCargaHeaders[]
): OperacaoCargaTotal[] => {
  console.log(cargas)
  const operacoesSoma: Record<string, OperacaoCargaTotal> = {
    total: {
      operacao: "total",
      VLPesoCargaBruta: 0,
    },
  };

  cargas.forEach((carga) => {
    const tipoOperacao = carga["Tipo Operação da Carga"]?.toLowerCase() || "indefinida";

    if (!operacoesSoma[tipoOperacao]) {
      operacoesSoma[tipoOperacao] = {
        operacao: tipoOperacao,
        VLPesoCargaBruta: 0,
      };
    }

    const peso = carga.VLPesoCargaBruta || 0;

    operacoesSoma[tipoOperacao].VLPesoCargaBruta += peso;
    operacoesSoma.total.VLPesoCargaBruta += peso;
  });

  return Object.values(operacoesSoma);
};
