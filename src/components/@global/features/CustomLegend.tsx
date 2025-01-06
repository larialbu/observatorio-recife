interface CustomLegendProps {
    dataSetter: any[];  // Espera um array de dados
    colors: string[];    // Espera um array de cores
    nameKey: string;     // Espera a chave do nome a ser acessada no entry
  }
  
  const CustomLegend = ({
    dataSetter,
    colors,
    nameKey, // Chave para acessar o nome dentro de 'dataSetter'
  }: CustomLegendProps) => {
    return (
      <div className="absolute top-[1.7em] flex flex-wrap justify-center gap-2 w-[100%]">
        {dataSetter.map((entry: any, index: any) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: colors[index % colors.length] }}
            ></span>
            <span className="text-sm">{entry[nameKey]}</span> {/* Usando nameKey aqui */}
          </div>
        ))}
      </div>
    );
  };
  
  export default CustomLegend;
  