import Image from "next/image";

const Card = ({
  title = "",
  data,
  year,
  color,
  local,
}: {
  title: string;
  local?: string;
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
          {local ? `${local} -` : ""} {year}
        </span>
      </div>
      <h1 className="text-2xl text-white font-semibold my-4">{data}</h1>
      <h2 className="  text-sm font-semibold text-white">{title}</h2>
    </div>
  );
};

export default Card;
