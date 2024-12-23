import ChartGrabber from "@/components/@global/features/ChartGrabber";
import TableGeneric from "@/components/@global/tables/TableGeneric";

const AirportInfo = ({
  data = [],
  airport='Recife',
  year='2023',
  title = "Decolagens por Aeroporto",
//   colors = ColorPalette.default,
}: any) => {
  // O filtro por ano já deve ser feito fora do componente
//   const chartData = processDecolagensPorAeroporto(data);

const aggregatedData = data
.filter((item: any) => item["AEROPORTO NOME"] === airport && item["ANO"] === year)
.reduce((acc: any, item: any) => {
  const mes = item["MÊS"];
  if (!acc[mes]) {
    acc[mes] = { ANO: year, MÊS: mes, PASSAGEIRO: 0, CARGA: 0, DECOLAGENS: 0 };
  }
  acc[mes].PASSAGEIRO += Number(item["PASSAGEIRO"]) || 0;
  acc[mes].CARGA += Number(item["CARGA"]) || 0;
  acc[mes].DECOLAGENS += Number(item["DECOLAGENS"]) || 0;
  return acc;
}, {});

const sortedData = Object.values(aggregatedData).sort((a: any, b: any) => parseInt(a.MÊS, 10) - parseInt(b.MÊS, 10));

console.log('--->>> aaaa', aggregatedData)

console.log('--->>> sorted', sortedData)

// console.log('--->>> keys', Object.keys(aggregatedData['1']))

const header = Object.keys(aggregatedData['1'])

const rows = sortedData.map(obj => {
  return []
})

  return (
    <div className="relative bg-white w-full p-4">
      {/* <ChartGrabber> */}
        <TableGeneric headers={header} rows={[['bem', 'bom', 'sim', 'ab', 'ac'], ['sla', 'teste', 'azul', 'ag', 'ab']]} />
      {/* </ChartGrabber> */}
    </div>
  );
}

export default AirportInfo