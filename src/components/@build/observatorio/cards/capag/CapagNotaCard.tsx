const NOTA_COLORS: Record<string, string> = {
  A: "#22C55E",
  B: "#0155AE",
  C: "#FFBB28",
  D: "#EF4444",
};

const CapagNotaCard = ({
  title,
  nota,
  year,
  color,
}: {
  title: string;
  nota?: string | null;
  year: string;
  color?: string;
}) => {
  const displayNota = nota ?? "--";
  const barColor = color ?? (nota ? NOTA_COLORS[nota] ?? "#94A3B8" : "#94A3B8");

  return (
    <div
      className="rounded-lg p-4 flex-1 shrink-0 w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0C1B2B] shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out"
      style={{ borderLeft: `8px solid ${barColor}`, minWidth: "310px" }}
    >
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-light text-gray-600 dark:text-gray-400">CAPAG - {year}</span>
      </div>

      <h1 className="text-4xl font-bold mb-2 w-fit" style={{ color: nota ? barColor : undefined }}>
        <span className={!nota ? "text-gray-400 dark:text-gray-600" : ""}>{displayNota}</span>
      </h1>

      <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300 opacity-80">{title}</h2>
    </div>
  );
};

export default CapagNotaCard;
