import TableGeneric from "@/components/@global/tables/TableGeneric";
import { rowsCountrysByMunicipio } from "@/functions/process_data/observatorio/balanca-comercial/analitico/rowsCountrysByMunicipio";
import { rowsProfissao } from "@/functions/process_data/observatorio/empregos/rais/remuneracao/rowsProfissao";
import { formatNumber } from "@/utils/formatters/@global/numberFormatter";
import { useState } from "react";

const RemuneracaoProfissao = ({
  data = [],
  profissao,
  year,
  color = "#000000",
  selectCountry,
  monthRecent,
  title = '',
}: any) => {
// -1, 0, 1
// asc, null, desc
// passar isso no componenten e o componente vai ficar alterando o objeto e quando mudar vai alterar aki tb
const [ordenation, setOrdenation] = useState([{ index: 1, name: 'quantidade', ordenation: 0 }, { index: 3, name: 'remunecaoMed', ordenation: 0 }, { index: 4, name: 'remuneracaoMaior', ordenation: 0 }]);
console.log('ORdenationaaaaaa->->', ordenation)

const dataFiltred = profissao.length ? data.ativ.filter((item: any) => profissao.includes(item["CBO Ocupação 2002"])) : data.ativ

const order = ordenation.find((item) => item.ordenation != 0)

const aggregatedData = rowsProfissao(dataFiltred || []) 

const dataSorted = order ? aggregatedData.sort((a: any, b: any) => order.ordenation === 1 ? a[order.name] - b[order.name] : b[order.name] - a[order.name]) : aggregatedData

  const firstAggregated: any = aggregatedData[0];

  if (!firstAggregated) {
    return <div>Nenhum dado econtrado</div>;
  }
 
  const header = ['Título', 'Quantidade', 'Média de salário mínimo', 'Remuneração média dezembro nomial', 'Maior Remuneração']

  const getRows = (values: any) => {
    const rows: string[][] = [];

    values.map((obj: any) => {
      rows.push([
        <div className="w-full flex justify-center">
            <div className="w-[250px]">{obj["nome"]}</div>
        </div>,
        obj["quantidade"],
        <div className="w-full flex justify-center">
            <div className="w-[100px]">{formatNumber(obj["salarioMinMed"])}</div>
        </div>,
        <div className="w-full flex justify-center">
          <div className="w-[150px]">
            <span>$</span> {formatNumber(obj["remunecaoMed"])}
          </div>
        </div>,
        <div className="w-full flex justify-center">
          <div className="w-[150px]">
            <span>$</span> {formatNumber(obj["remuneracaoMaior"])}
          </div>
        </div>,
      ]);
    });

    return rows;
  };

  return (
    <div className="w-full bg-red-400 p-2 flex flex-1">
      <div className="bg-slate-500 h-full flex-1 p-3">
         a
      </div>

    </div>
  );
};

export default RemuneracaoProfissao;


{/* <TableGeneric
          ordenations={ordenation}
          onOrdenationChange={setOrdenation}
          enablePagination={false}
          withClick
          color={'#ffffff'}
          clickedColor={color}
          headers={header}
          title={''}
          simple
          rows={getRows(dataSorted)}
        /> */}