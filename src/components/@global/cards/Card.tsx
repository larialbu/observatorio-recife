import { tooltipFormatter } from "@/utils/formatters/@global/graphFormatter";

const Card = ({
  title = "",
  data,
  year,
  color,
  local,
  percent = false,
  position = false
}: {
  title: string;
  local?: string;
  data: number | string | {};
  year: string;
  color: string | string[];
  percent?: boolean;
  position?: boolean;
}) => {
  return (
    // w-fit - w-full
    <div
      className="rounded-lg  p-4 flex-1 shrink-0  min-w-[310px] w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0C1B2B] shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out"
      style={{ borderLeft: `8px solid ${color}` }}
    >
      {/* Header: Local and Year */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-light text-gray-600 dark:text-gray-400">
          {local ? `${local} -` : ""} {year}
        </span>
      </div>

      {/* Main Data */}
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2 w-fit">
        {percent ? `${tooltipFormatter(+data)}%` : ( position ? `${tooltipFormatter(+data)}°` : tooltipFormatter(+data))}
      </h1>

      {/* Title */}
      <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300 opacity-80">{title}</h2>
    </div>
  );
};

export default Card;
