import { formatNormalnumber } from "@/utils/formatters/@global/numberFormatter";

const ComparativeCard = ({
  title = "",
  data,
  data2,
  comparative,
  year,
  color,
}: {
  title: string;
  data: number | string;
  data2: number | string
  comparative: string
  year: string;
  color: string;
}) => {
  // Variáveis para armazenar o total de passageiros e o número de registros

  const percentComparative = (data1: number, data2: number): {
    text: string
    color: string
  } => {

    const percentageDifference = ((data2 - data1) / data1) * 100;
  
    if (percentageDifference > 0) {
      return {
        text: `- ${percentageDifference.toFixed(2)}%`,
        color: 'text-red-700'
      } 
    } else {
      return {
        text: `+ ${Math.abs(percentageDifference).toFixed(2)}%`,
        color: 'text-green-700'
    }  
  };
}

const percentage = percentComparative(+data, +data2)

  return (
    <div
      className="rounded-2xl p-4 flex-1 min-w-[250px]"
      style={{ backgroundColor: color }}
    >
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-[#0155AE]">
          {year}
        </span>
        <span className={`bg-white rounded-full font-semibold text-[12px] px-2 ${percentage.color} py-1`}>{percentage.text} Recife</span>
      </div>
      <h1 className="text-2xl text-white font-semibold my-4">{formatNormalnumber(+data2)}<span className="opacity-85 text-sm"> / {formatNormalnumber(+data)}</span></h1>
      <h2 className="text-sm font-semibold text-white">{title}</h2>
      <span className="opacity-85 text-white text-sm">{comparative}</span>
    </div>
  );
};

export default ComparativeCard;
