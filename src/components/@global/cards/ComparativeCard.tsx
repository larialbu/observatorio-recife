import { tooltipFormatter } from "@/utils/formatters/@global/graphFormatter";
import { formatNormalnumber } from "@/utils/formatters/@global/numberFormatter";

const ComparativeCard = ({
  title = "",
  data,
  data2,
  comparative,
  year,
  color,
  position = false,
  compare = ['Recife', 'Recife']
}: {
  title: string;
  data: number | string;
  data2: number | string
  comparative: string
  year: string;
  color: string;
  position?: boolean
  compare: string[]
}) => {
  // Variáveis para armazenar o total de passageiros e o número de registros

  const [toCompare, comp] = compare

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
      className="rounded-2xl p-4 flex-1 min-w-[250px] bg-white text-black h-full flex flex-col"
      style={{ borderLeft: `8px solid ${color}` }}
    >
      <div className="flex justify-between items-center ">
        <span className="text-xs font-light text-gray-600">
            {year}
        </span>
       {toCompare !== comp && <span style={{ borderColor: `${color}` }} className={`border bg-white rounded-full font-semibold text-[12px] px-2 ${percentage.color} py-1`}>{percentage.text} {comp}</span>}
      </div>
     <div className="flex flex-col justify-between flex-1 ">
        <h1 className="text-2xl text-whit font-semibold my-4">{tooltipFormatter(+data2)}<span className="opacity-85 text-sm">{ toCompare !== comp && `/ ${tooltipFormatter(+data)}` }</span></h1>
      <div>
        <h2 className="text-sm font-semibold text-whit">{title}</h2>
        <span className="opacity-85 text-whit text-sm">{comparative}</span>
      </div>
     </div>
     
      
    </div>
  );
};

export default ComparativeCard;
