import Image from "next/image";

const DecolagensTotaisBox = ({ data, year, municipio, backgroundColor }: { data: any[], year: string, municipio: string, backgroundColor: string }) => {
  const getTotalDecolagens = (filterMunicipio: string) => {
    return data.reduce((acc: number, item: any) => {
      const ano = item["ANO"];
      const itemMunicipio = item["AEROPORTO NOME"];
      const decolagens = Number(item["DECOLAGENS"]) || 0;

      if (ano === year && itemMunicipio === filterMunicipio) {
        return acc + decolagens;
      }
      return acc;
    }, 0);
  };

  const totalMunicipio = getTotalDecolagens(municipio);
  const totalRecife = getTotalDecolagens("RECIFE");

  return (
    <div className="rounded-2xl p-4 flex-1 min-w-[130px]" style={{ backgroundColor }}>
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-[#0155AE]">
          {year}
        </span>
        <Image src="/more.png" alt="More options" width={20} height={20} />
      </div>
      <h1 className="text-2xl font-semibold my-4 text-white">
        {totalMunicipio.toLocaleString()}
        <span className="text-xs text-white opacity-80 ml-1">/ {totalRecife.toLocaleString()}</span>
      </h1>
      <h2 className="capitalize text-sm font-medium text-white">Decolagens Totais</h2>
      <p className="text-xs text-white opacity-80">
        {municipio} vs Recife
      </p>
    </div>
  );
};

export default DecolagensTotaisBox;
