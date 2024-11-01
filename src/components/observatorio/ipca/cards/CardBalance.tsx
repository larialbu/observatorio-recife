import Image from "next/image";

const CardBalance = ({
  type,
  data,
  year,
  color,
}: {
  type: string;
  data: number | string;
  year: string;
  color: string;
}) => {
  // Variáveis para armazenar o total de passageiros e o número de registros

  return (
    <div
      className="rounded-2xl p-4 flex-1 min-w-[250px]"
      style={{ backgroundColor: color }}
    >
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-[#0155AE]">
          Recife - {year}
        </span>
        <Image src="/more.png" alt="More options" width={20} height={20} />
      </div>
      <h1 className="text-2xl text-white font-semibold my-4">{data}%</h1>
      <h2 className="capitalize text-sm font-semibold text-white">{type}</h2>
    </div>
  );
};

export default CardBalance;
