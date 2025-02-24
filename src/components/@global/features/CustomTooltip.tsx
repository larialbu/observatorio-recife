import React from "react";

const CustomTooltip = ({ active, payload, label, customTooltipFormatter, chartType }: any) => {
  if (active && payload && payload.length) {
    // Lógica específica para os gráficos de importação/exportação
    if (
      chartType === "continentesImportacaoExportacao" ||
      chartType === "paisesImportacaoExportacao" ||
      chartType === "produtosImportacaoExportacao"
    ) {
      // Calcula a soma dos percentuais de importação e exportação
      const totalPercentualBal = payload.reduce((sum: number, entry: any) => {
        return sum + (entry.percent || 0);
      }, 0);

      return (
        <div className="mb-[-1em] bg-white p-4 rounded-lg shadow-md max-w-[325px] break-words text-sm text-gray-800 border-l-4 border-blue-600">
          {/* Título do Tooltip */}
          <h4 className="text-lg font-bold text-blue-600 mb-2">{label}</h4>
          {/* Conteúdo do Tooltip */}
          <div className="flex flex-col gap-y-2">
            {payload.map((entry: any, index: number) => {
              // Extrai os valores absolutos e percentuais
              const value = entry.value;
              const percent = entry.percent;
              // Define a cor com base no nome da métrica
              const color =
                entry.name === "Exportação"
                  ? "#52B348" // Cor para exportação
                  : entry.color || "#2563eb"; // Cor padrão ou definida no payload

              return (
                <React.Fragment key={index}>
                  {/* Linha para o Valor Absoluto */}
                  <p className="flex text-sm gap-2">
                    {/* Nome da métrica */}
                    <span className="text-gray-500 font-medium">{entry.name}:</span>
                    {/* Valor absoluto */}
                    <span style={{ color }} className={`font-bold`}>
                      {customTooltipFormatter(value)} {/* Formata o valor absoluto */}
                    </span>
                  </p>
                  {/* Linha para o Percentual */}
                  {percent !== undefined && (
                    <p className="flex text-sm gap-2">
                      {/* Nome da métrica */}
                      <span className="text-gray-500 font-medium">{`${entry.name} (Percentual):`}</span>
                      {/* Percentual */}
                      <span style={{ color }} className="font-bold">
                        {percent.toFixed(2)}%
                      </span>
                    </p>
                  )}
                </React.Fragment>
              );
            })}
            {/* Linha para a Soma dos Percentuais */}
            <p className="flex text-sm gap-2">
              {/* Nome da métrica */}
              <span className="text-gray-500 font-medium">Total (Percentual):</span>
              {/* Valor total dos percentuais */}
              <span className="text-[#EC6625] font-bold">{totalPercentualBal.toFixed(2)}%</span>
            </p>
          </div>
        </div>
      );
    }

    // Comportamento padrão para outros gráficos
    return (
      <div className="mb-[-1em] bg-white p-4 rounded-lg shadow-md max-w-[300px] break-words text-sm text-gray-800 border-l-4 border-blue-600">
        <h4 className="text-lg font-bold text-blue-600 mb-2">{label}</h4>
        <div className="flex flex-wrap gap-x-3">
          {payload.map((entry: any, index: number) => (
            <p key={index} className="flex justify-between mb-2 text-sm gap-2">
              <span className="text-gray-500 font-medium">{entry.name}:</span>
              <span
                style={{ color: `${entry.color}` }}
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