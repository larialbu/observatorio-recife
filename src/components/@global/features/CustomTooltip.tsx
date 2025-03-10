const CustomTooltip = ({ active, payload, label, customTooltipFormatter, fontSize }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="mb-[-1em] bg-white p-4 rounded-lg shadow-md sm:max-w-[300px] max-w-[180px] break-words text-sm text-gray-800 border-l-4 border-blue-600"
        style={{
          wordWrap: "break-word", // Força a quebra de palavras longas
          wordBreak: "break-word", // Quebra palavras longas em palavras menores
        }}
      >
        {/* Ajustando fontSize com Tailwind e inline */}
        <h4
          className={`font-bold text-blue-600 mb-2 sm:text-lg text-[13px]`} // Tailwind para text-lg e sm:text-[13px]
          style={{
            fontSize: fontSize ? `${fontSize}px` : undefined, // Se fontSize existir, aplica inline
            lineHeight: "1.25rem", // Adicionando line-height diretamente no estilo
          }}
        >
          {label}
        </h4>
        <div className="flex flex-wrap gap-x-3">
          {payload.map((entry: any, index: number) => (
            <p
              key={index}
              className="flex justify-between mb-2 text-sm gap-2"
            >
              <span className="text-gray-500 font-medium">
                {entry.name}:
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
