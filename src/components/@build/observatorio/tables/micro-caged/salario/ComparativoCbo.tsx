import TableGeneric from "@/components/@global/tables/TableGeneric";
import { rowsComparativoCbo } from "@/functions/process_data/observatorio/micro-caged/salario/rowsComparativoCbo";
import { rowsProfissao } from "@/functions/process_data/observatorio/rais/remuneracao/rowsProfissao";
import { formatNumber } from "@/utils/formatters/@global/numberFormatter";
import { useState } from "react";

const ComparativoCbo = ({
  data = [],
  profissao,
  color = "#000000",

}: any) => {
// -1, 0, 1
// asc, null, desc
// passar isso no componenten e o componente vai ficar alterando o objeto e quando mudar vai alterar aki tb
const [ordenation, setOrdenation] = useState([{ index: 2, name: 'salario', ordenation: 0 }]);

const dataFiltred = profissao.length ? data.filter((item: any) => profissao.includes(item["cbo2002ocupação"])) : data

const order = ordenation.find((item) => item.ordenation != 0)

const aggregatedData = rowsComparativoCbo(dataFiltred || [])
console.log('Aggrefated', aggregatedData) 
// const aggregatedData = rowsProfissao(dataFiltred || []) 

const dataSorted = order ? aggregatedData.sort((a: any, b: any) => order.ordenation === 1 ? a[order.name] - b[order.name] : b[order.name] - a[order.name]) : aggregatedData

  const firstAggregated: any = aggregatedData[0];

  if (!firstAggregated) {
    return <div>Nenhum dado econtrado</div>;
  }

  const header = ['Código CBO', 'Descrição', 'Salário médio']

  const getRows = (values: any) => {
    const rows: string[][] = [];

    values.map((obj: any) => {
      rows.push([
        obj["codigo"],
        <div className="w-full flex justify-start">
          <div className="w-full text-start">
            {obj["descricao"]}
          </div>
        </div>,
        <div className="w-full flex justify-center">
          <div className="w-[150px]">
            <span>R$</span> {formatNumber(obj["salario"])}
          </div>
        </div>,
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
          color={'#ffffff'}
          clickedColor={color}
          headers={header}
          title={''}
          maxHeight={800}
          rows={getRows(dataSorted)}
        />
    </div>
  );
};

export default ComparativoCbo;


