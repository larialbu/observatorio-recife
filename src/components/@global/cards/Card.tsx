import { tooltipFormatter } from "@/utils/formatters/@global/graphFormatter";

const Card = ({
  title = "",
  data,
  year,
  color,
  local,
  percent = false,
}: {
  title: string;
  local?: string;
  data: number | string;
  year: string;
  color: string;
  percent?: boolean;
}) => {
  return (
    // w-fit - w-full
    <div
      className="rounded-lg  p-4 flex-1 shrink-0  min-w-[310px] w-full border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out"
      style={{ borderLeft: `8px solid ${color}` }}
    >
      {/* Header: Local and Year */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-light text-gray-600">
          {local ? `${local} -` : ""} {year}
        </span>
      </div>

      {/* Main Data */}
      <h1 className="text-4xl font-bold text-gray-900 mb-2 w-fit">
        {percent ? `${tooltipFormatter(+data)}%` : tooltipFormatter(+data)}
      </h1>

      {/* Title */}
      <h2 className="text-lg font-medium text-gray-700 opacity-80">{title}</h2>
    </div>
  );
};

export default Card;
