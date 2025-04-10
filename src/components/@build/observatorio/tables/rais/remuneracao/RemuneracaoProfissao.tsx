import TableGeneric from "@/components/@global/tables/TableGeneric";
import { rowsCountrysByMunicipio } from "@/functions/process_data/observatorio/balanca-comercial/analitico/rowsCountrysByMunicipio";
import { rowsProfissao } from "@/functions/process_data/observatorio/empregos/rais/remuneracao/rowsProfissao";
import { formatNumber } from "@/utils/formatters/@global/numberFormatter";

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
const ordenation = [{index: 3, name: 'remunecaoMed', ordenation: 0 }]

const dataFiltred = profissao.length ? data.ativ.filter((item: any) => profissao.includes(item["CBO Ocupação 2002"])) : data.ativ

const aggregatedData = rowsProfissao(dataFiltred || [])

  const firstAggregated: any = aggregatedData[0];

  if (!firstAggregated) {
    return <div>Nenhum dado econtrado</div>;
  }
 
  const header = ['Título', 'Quantidade', 'Média de salário mínimo', 'Remuneração média dezembro nomial', 'Maior Remuneração']

  const getRows = (values: any) => {
    const rows: string[][] = [];

    values.map((obj: any) => {
      const formatPercent = (val: number) => {
        let percent;

        if (Math.round(val * 100) / 100 != 0) {
          percent = Math.round(val * 100) / 100;
        } else if (
          Math.round(val * 100) / 100 == 0 &&
          Math.round(val * 1000) / 1000 != 0
        ) {
          percent = Math.round(val * 1000) / 1000;
        } else if (
          Math.round(val * 1000) / 1000 == 0 &&
          Math.round(val * 10000) / 10000 != 0
        ) {
          percent = Math.round(val * 10000) / 10000;
        }

        return percent;
      };

      rows.push([
        <div className="w-full flex justify-center">
            <div className="w-[250px]">{obj["nome"]}</div>
        </div>,
        obj["quantidade"],
        formatNumber(obj["salarioMinMed"]),
        <div className="flex gap-1 justify-center">
          <span>$</span> {formatNumber(obj["remunecaoMed"])}
        </div>,
        <div className="flex gap-1 justify-center">
          <span>$</span> {formatNumber(obj["remuneracaoMaior"])}
        </div>,
      ]);
    });

    return rows;
  };

  return (
    <div className="relative w-full ">
      <TableGeneric
        enablePagination={false}
        withClick
        color={'#ffffff'}
        clickedColor={color}
        headers={header}
        title={''}
        simple
        rows={getRows(aggregatedData)}
      />
    </div>
  );
};

export default RemuneracaoProfissao;
