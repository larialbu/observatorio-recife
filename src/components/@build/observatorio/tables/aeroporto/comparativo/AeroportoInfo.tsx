import TableGeneric from "@/components/@global/tables/TableGeneric";
import { monthFormatter } from "@/utils/formatters/@global/dateArrFormatter";
import { formatNormalnumber } from "@/utils/formatters/@global/numberFormatter";
import { useState } from "react";

const AeroportoInfo = ({
  data = [],
  airport = 'Recife',
  year,
  color = '#000000'
}: any) => {

  const [ordenation, setOrdenation] = useState([{ index: 0, name: 'MÊS', ordenation: 0 }, { index: 1, name: 'PASSAGEIRO', ordenation: 0 }, { index: 2, name: 'CARGA', ordenation: 0 }, { index: 3, name: 'DECOLAGENS', ordenation: 0 }]);

  const order = ordenation.find((item) => item.ordenation != 0)

  // Filtra os dados com base no aeroporto e ano
  const aggregatedData = data
    .filter((item: any) => item["AEROPORTO NOME"] === airport && item["ANO"].toString() === `${year}`)
    .reduce((acc: any, item: any) => {
      const mes = item["MÊS"];
      if (!acc[mes]) {
        acc[mes] = { MÊS: mes, PASSAGEIRO: 0, CARGA: 0, DECOLAGENS: 0 };
      }
      acc[mes].PASSAGEIRO += Number(item["PASSAGEIRO"]) || 0;
      acc[mes].CARGA += Number(item["CARGA"]) || 0;
      acc[mes].DECOLAGENS += Number(item["DECOLAGENS"]) || 0;
      return acc;
    }, {});

  const sortedData = Object.values(aggregatedData).sort((a: any, b: any) => parseInt(a.MÊS, 10) - parseInt(b.MÊS, 10));

  const dataSorted = order ? sortedData.sort((a: any, b: any) => order.ordenation === 1 ? a[order.name] - b[order.name] : b[order.name] - a[order.name]) : sortedData


  // Verifica se o dado foi agregado e se existe algum mês agregado
  const firstAggregated = Object.keys(aggregatedData)[0];
  
  if (!firstAggregated) {
    return <div>Nenhum dado encontrado</div>;
  }

  const header = ["Mês", "Passageiro", "Carga", "Decolagens"]; 

  const getRows = (values: any) => {
    const rows: string[][] = [];

    values.map((obj: any) => {
      rows.push([monthFormatter(+obj.MÊS) || 'Desconhecido', formatNormalnumber(+obj.PASSAGEIRO), formatNormalnumber(+obj.CARGA), formatNormalnumber(+obj.DECOLAGENS)]);
    });

    return rows;
  };

  return (
    <div className="relative w-full rounded-2xl">
      <TableGeneric ordenations={ordenation} onOrdenationChange={setOrdenation} maxHeight={500} rowsPerPage={100} color={color} headers={header} title={`Dados de ${airport} (${year})`} rows={getRows(dataSorted)} />
    </div>
  );
};

export default AeroportoInfo;
