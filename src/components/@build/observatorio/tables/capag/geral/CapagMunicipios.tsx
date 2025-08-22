import { useState } from "react";

import TableGeneric from "@/components/@global/tables/TableGeneric";
import { formatNumber } from "@/utils/formatters/@global/numberFormatter";
import { monthLongName } from "@/utils/formatters/@global/monthLongName";
import { processItbiAvaliacoesTable } from "@/functions/process_data/observatorio/tributos/itbi-avaliacoes/itbiAvaliacoesTable";
import { processIptuPesquisaTable } from "@/functions/process_data/observatorio/tributos/iptu-pesquisa/IptuPesquisaTable";

const CapagMunicipios = ({
  data = [],
  color = "#000000",

}: any) => {
// -1, 0, 1
// asc, null, desc
// passar isso no componenten e o componente vai ficar alterando o objeto e quando mudar vai alterar aki tb  
const [ordenation, setOrdenation] = useState([{ index: 1, name: 'valor', ordenation: 0 }]);

function transformarData(obj: any) {
  const indicadores = ['Endividamento', 'Liquidez', 'Poupança Corrente'];

  return indicadores.map(indicador => ({
    indicador,
    valor: +obj?.[indicador].toFixed(3),
    nota: obj?.[`${indicador}_Nota`]
  }));
}

// const dataRawData = data?.['tributos'] || [];

const order = ordenation.find((item) => item.ordenation != 0)

const chartData = transformarData(data[0])
// const chartData = processIptuPesquisaTable(dataRawData)

const aggregatedData = chartData

const dataSorted = order ? aggregatedData.sort((a: any, b: any) => order.ordenation === 1 ? a[order.name] - b[order.name] : b[order.name] - a[order.name]) : aggregatedData

  const firstAggregated: any = aggregatedData?.[0];

  if (!firstAggregated) {
    return <div>Nenhum dado econtrado</div>;
  }

  const header = ['Indicador', 'Valor', 'Nota']


  const getRows = (values: any) => {
    const rows: string[][] = [];

    values.map((obj: any) => {
      rows.push([
        obj["indicador"],
        obj["valor"],
        obj["nota"],
      ] as string[]);
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
          color={'#ffffff'}
          clickedColor={color}
          headers={header}
          title={''}
          maxHeight={180}
          rows={dataSorted}
          getRows={getRows}
        />
    </div>
  );
};

export default CapagMunicipios;


