import TableGeneric from "@/components/@global/tables/TableGeneric";
import { CapagMunicipioData } from "@/@types/observatorio/@data/capagData";

const formatValor = (v: number) => v.toLocaleString("pt-BR", { minimumFractionDigits: 3, maximumFractionDigits: 3 });

const CapagClassificacaoTable = ({
  data,
  title,
  color,
  emptyMessage = "Selecione um Município...",
}: {
  data: CapagMunicipioData | null;
  title: string;
  color: string;
  emptyMessage?: string;
}) => {
  if (!data) {
    return (
      <div className="rounded-lg h-full flex items-center justify-center min-h-[220px] border border-dashed border-gray-300 dark:border-gray-700 text-gray-400 dark:text-gray-600">
        <p className="text-sm">{emptyMessage}</p>
      </div>
    );
  }

  const rows: React.ReactNode[][] = [
    ["Endividamento", formatValor(data.endividamento.valor), data.endividamento.nota],
    ["Liquidez", formatValor(data.liquidez.valor), data.liquidez.nota],
    ["Poupança Corrente", formatValor(data.poupancaCorrente.valor), data.poupancaCorrente.nota],
  ];

  return (
    <TableGeneric
      title={title}
      color={color}
      headers={["Indicador", "Valor", "Nota"]}
      rows={rows}
      enablePagination={false}
      maxHeight={220}
    />
  );
};

export default CapagClassificacaoTable;
