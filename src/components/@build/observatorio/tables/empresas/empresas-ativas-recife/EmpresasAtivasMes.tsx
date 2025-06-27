import TableGeneric from "@/components/@global/tables/TableGeneric";
import { rowsComparativoCbo } from "@/functions/process_data/observatorio/micro-caged/salario/rowsComparativoCbo";
import { rowsProfissao } from "@/functions/process_data/observatorio/rais/remuneracao/rowsProfissao";
import { formatNumber } from "@/utils/formatters/@global/numberFormatter";
import { useState } from "react";

const EmpresasAtivasMes = ({
  data = [],
  profissao,
  color = "#000000",

}: any) => {
// -1, 0, 1
// asc, null, desc
// passar isso no componenten e o componente vai ficar alterando o objeto e quando mudar vai alterar aki tb
const [ordenation, setOrdenation] = useState([{ index: 0, name: 'mes', ordenation: 0 }]);

// const dataFiltred = profissao.length ? data.filter((item: any) => profissao.includes(item["cbo2002ocupação"])) : data

const order = ordenation.find((item) => item.ordenation != 0)

const chartData = data.sort((a: any, b: any) => a['mes'] - b['mes']).map((dataMap: any, i: any) => {
        if (dataMap['mes'] !== 1) {
           return { mes: dataMap['mes'], empresas: dataMap['Empresas Ativas'], variacao: (((dataMap['Empresas Ativas'] - data[i - 1]['Empresas Ativas']) / data[i - 1]['Empresas Ativas']) * 100).toFixed(2) }
        }
        return { mes: dataMap['mes'], empresas: dataMap['Empresas Ativas'], variacao: 0}
    }) 

const aggregatedData = chartData
// const aggregatedData = rowsComparativoCbo(dataFiltred || [])
console.log('AggregatedDAta', aggregatedData)

const dataSorted = order ? aggregatedData.sort((a: any, b: any) => order.ordenation === 1 ? a[order.name] - b[order.name] : b[order.name] - a[order.name]) : aggregatedData

  const firstAggregated: any = aggregatedData[0];

  if (!firstAggregated) {
    return <div>Nenhum dado econtrado</div>;
  }

  const header = ['Mês', 'Empresas Ativas', 'Variação']
//   const header = ['Código CBO', 'Descrição', 'Grupo', 'Admitidos', 'Demitidos', 'Saldo', 'Salário médio']

  const getRows = (values: any) => {
    const rows: string[][] = [];

    values.map((obj: any) => {
      rows.push([
        // o mes vai ser um nmero colocar algo para traduzir 
        obj["mes"],
        obj["empresas"],
        obj["variacao"],
        
        // obj["codigo"],
        // <div className="w-full flex justify-start">
        //   <div className="w-full text-start">
        //     {obj["descricao"]}
        //   </div>
        // </div>,
        // obj["grupo"],
        // obj["admitidos"],
        // obj["demitidos"],
        // obj["saldo"],
        // <div className="w-full flex justify-center">
        //   <div className="w-[150px]">
        //     <span>R$</span> {formatNumber(obj["salario"])}
        //   </div>
        // </div>,
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

export default EmpresasAtivasMes;


