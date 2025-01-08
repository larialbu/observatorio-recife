const CustomTooltip = ({ active, payload, label, customTooltipFormatter}: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-md max-w-[300px] break-words text-sm text-gray-800 border-l-4 border-blue-600">
          <h4 className="text-lg font-bold text-blue-600 mb-2">
            {label}
          </h4>
          {payload.map((entry: any, index: number) => (
            <p
              key={index}
              className="flex justify-between mb-2 text-sm gap-2"
            >
              <span className="text-gray-500 font-medium">
                {entry.name}:
              </span>
              <span
                style={{ color: `${entry.color}` }}
                className={`font-bold ${entry.color ? `text-[${entry.color}]` : 'text-blue-600'}`}
              >
                {customTooltipFormatter(entry.value)}
              </span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  }

export default CustomTooltip