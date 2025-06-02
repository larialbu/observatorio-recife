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
const [ordenation, setOrdenation] = useState([{ index: 3, name: 'admitidos', ordenation: 0 }, { index: 4, name: 'demitidos', ordenation: 0 }, { index: 5, name: 'saldo', ordenation: 0 }, { index: 6, name: 'salario', ordenation: 0 }]);

// primeiro vou passar um loop no campo de salário minio para pegar os valores dos salários minimos no ano, e vou selecioanr o menor valor e subistituir pelo 1518
const dataSalarioFiltred = data.filter((obj: any) => obj['indtrabintermitente'] == 0 && obj['salário'] >= 1518 * 0.3 && obj['salário'] <= 1518 * 150)

const dataFiltred = profissao.length ? dataSalarioFiltred.filter((item: any) => profissao.includes(item["cbo2002ocupação"])) : dataSalarioFiltred

const order = ordenation.find((item) => item.ordenation != 0)

const aggregatedData = rowsComparativoCbo(dataFiltred || [])
// const aggregatedData = rowsProfissao(dataFiltred || []) 

const dataSorted = order ? aggregatedData.sort((a: any, b: any) => order.ordenation === 1 ? a[order.name] - b[order.name] : b[order.name] - a[order.name]) : aggregatedData

  const firstAggregated: any = aggregatedData[0];

  if (!firstAggregated) {
    return <div>Nenhum dado econtrado</div>;
  }

  const header = ['Código CBO', 'Descrição', 'Grupo', 'Admitidos', 'Demitidos', 'Saldo', 'Salário médio']

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
        obj["grupo"],
        obj["admitidos"],
        obj["demitidos"],
        obj["saldo"],
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


