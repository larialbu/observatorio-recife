const CustomTooltip = ({ active, payload, label, customTooltipFormatter, fontSize, treeMap }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="mb-[-1em] bg-white p-4 rounded-lg shadow-md sm:max-w-[300px] max-w-[180px] break-words text-sm text-gray-800 border-l-4 border-blue-600">
        <h4
          className={`font-bold text-blue-600 mb-2 sm:text-lg text-[13px]`}
          style={{
            fontSize: fontSize ? `${fontSize}px` : undefined,
            lineHeight: "1.25rem",
          }}
        >
          {label}
        </h4>
        <div className="flex flex-wrap gap-x-3">
          {payload.map((entry: any, index: number) => (
            <p
              key={index}
              className="flex flex-col justify-between mb-2 mt-2 text-sm"
            >
              <span className="text-gray-500 font-medium">
                {treeMap ? entry.payload.label : entry.name}:
              </span>
              <span
                style={{ color: entry.color }}
                className={`font-bold ${entry.color ? `text-[${entry.color}]` : 'text-blue-600'}`}
              >
                {customTooltipFormatter(entry.value)}
              </span>
            </p>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
