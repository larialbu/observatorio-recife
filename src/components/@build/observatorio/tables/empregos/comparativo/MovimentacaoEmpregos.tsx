import TableGeneric from "@/components/@global/tables/TableGeneric";
import { rowsProfissao } from "@/functions/process_data/observatorio/rais/remuneracao/rowsProfissao";
import { tooltipFormatter } from "@/utils/formatters/@global/graphFormatter";
import { monthShortName } from "@/utils/formatters/@global/monthShortName";
import { formatNumber } from "@/utils/formatters/@global/numberFormatter";
import { percentFormatter } from "@/utils/formatters/@global/percentFormatter";
import { useState } from "react";

const MovimentacaoEmpregos = ({
  data = [],
  municipio,
  color = "#000000",

}: any) => {
// -1, 0, 1
// asc, null, desc
// passar isso no componenten e o componente vai ficar alterando o objeto e quando mudar vai alterar aki tb
const [ordenation, setOrdenation] = useState([{ index: 0, name: 'Mês', ordenation: 0 }, { index: 1, name: 'Admissões', ordenation: 0 }, { index: 2, name: 'Demissões', ordenation: 0 }, { index: 3, name: 'Saldos', ordenation: 0 }, { index: 4, name: 'Estoque', ordenation: 0 }, { index: 5, name: 'Variação', ordenation: 0 }]);

// Mês - Admissões - Demissões - Saldos - Estoque - Variação

const order = ordenation.find((item) => item.ordenation != 0)

const aggregatedData = data.sort((a: any, b: any) => a['Mês'] - b['Mês'])

const dataSorted = order ? aggregatedData.sort((a: any, b: any) => order.ordenation === 1 ? a[order.name] - b[order.name] : b[order.name] - a[order.name]) : aggregatedData

  const firstAggregated: any = aggregatedData[0];

  if (!firstAggregated) {
    return <div>Nenhum dado econtrado</div>;
  }

  const header = ['Mês', 'Admissões', 'Demissões', 'Saldo', 'Estoque', 'Variação']

  const getRows = (values: any) => {
    const rows: string[][] = [];

    values.map((obj: any) => {
      rows.push([
        monthShortName(obj['Mês']),
        tooltipFormatter(obj["Admissões"]),
        tooltipFormatter(obj["Demissões"]),
        tooltipFormatter(obj["Saldos"]),
        tooltipFormatter(obj["Estoque"]),
        `${percentFormatter(obj["Variação"])}%`
      ]);
    });
    return rows;
  };

  return (
    <div className="w-full flex flex-col flex-1">
        <TableGeneric
          ordenations={ordenation}
          onOrdenationChange={setOrdenation}
          enablePagination={false}
          withClick
          color={color}
          clickedColor={color}
          headers={header}
          title={municipio}
          maxHeight={525}
          rows={getRows(dataSorted)}
        />
    </div>
  );
};

export default MovimentacaoEmpregos;


