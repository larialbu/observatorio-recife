import Image from "next/image";

const ViagensPorAno = ({ type, data, year, backgroundColor }: { type: string, data: any[], year: string, backgroundColor: string }) => {
  // Cálculo do total de viagens ao ano, filtrando pelo ano correto
  let total = 0;
  if (type === "Total de viagens ao ano") {
    total = data.reduce((acc: number, item: any) => {
      const decolagens = Number(item["DECOLAGENS"]) || 0;
      const ano = item["ANO"];
      if (ano === year) {
        return acc + decolagens;
      }
      return acc;
    }, 0);
  }

  return (
    <div className="rounded-2xl p-4 flex-1 min-w-[130px]" style={{ backgroundColor }}>
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-[#0155AE]">
          {year}
        </span>
        <Image src="/more.png" alt="More options" width={20} height={20} />
      </div>
      <h1 className="text-2xl font-semibold my-4">{total.toLocaleString()}</h1> {/* Total formatado */}
      <h2 className="capitalize text-sm font-medium text-gray-500">{type}</h2>
    </div>
  );
};

export default ViagensPorAno;
