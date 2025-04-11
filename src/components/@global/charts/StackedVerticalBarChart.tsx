import { useState, useEffect } from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";

import { tooltipFormatter, yAxisFormatter } from "@/utils/formatters/@global/graphFormatter";
import CustomLegend from "../features/CustomLegend";
import CustomTooltip from "../features/CustomTooltip";
import { truncateTextFormatter } from "@/utils/formatters/@global/truncateTextFormatter";

const StackerBarChartVertical = ({
  data,
  title,
  xKey,
  bars,
  colors = [],
  heightPerCategory = 50, // Altura de cada barra
  visibleHeight = 300, // Altura visível do gráfico
  tooltipEntry,
  left = -35,
  yFontSize = 12,
  maxDescriptionLength = 50, // Definir limite de caracteres para o eixo Y
  tooltipTitleFontSize,
  widthY = 150,
}: any) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Verifica o tamanho da tela pra poder depois aumentar o gráfico no celular
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) { // sm breakpoint é 640px por padrão no Tailwind
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calcula a altura total com base no número de categorias
  let totalHeight = data.length * heightPerCategory;

  // Define uma altura mínima para o gráfico, caso haja poucas categorias
  if (data.length <= 5) totalHeight = 400;

  // Função customizada para o tooltip
  const customTooltipFormatter = (value: any) => {
    return tooltipFormatter(value, tooltipEntry || "");
  };

  return (
    <div className="relative bg-white w-full">
      <h3 className="text-center mb-[2em] font-semibold">{title}</h3>

      {/* Wrapper para scroll vertical */}
      <div
        className="overflow-y-auto overflow-x-visible"
        style={{
          height: `${isSmallScreen ? 600 : visibleHeight}px`, // Altera a altura para 500px em telas pequenas
        }}
      >
        <div>
          <ResponsiveContainer width="100%" height={totalHeight}>
            <RechartsBarChart
              data={data}
              layout="vertical"
              margin={{ top: 0, right: 7, left: left, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                tickFormatter={yAxisFormatter}
                tick={{ fontSize: 12 }}
                orientation="top"
              />
              <YAxis
                type="category"
                dataKey={xKey}
                tick={{ fontSize: yFontSize }}
                interval={0}
                width={widthY}
                // Truncar o texto apenas no eixo Y
                tickFormatter={(value: string) => truncateTextFormatter(value, maxDescriptionLength)}
              />
              <Tooltip
                content={(e) => CustomTooltip({ ...e, customTooltipFormatter, fontSize: tooltipTitleFontSize })}
              />
              <Legend
                verticalAlign="top"
                align="center"
                content={({ payload }) => {
                  return (
                    <div className="flex justify-center ml-10 mt-2">
                      <div className="w-[90%]">
                        <CustomLegend payload={payload} />
                      </div>
                    </div>
                  );
                }}
                iconSize={20}
              />
              {bars.map((bar: any, index: any) => (
                <Bar key={index} dataKey={bar.dataKey} name={bar.name} stackId="stack" fill={colors[index]}>
                  {data.map((entry: any, dataIndex: any) => {
                    const color =
                      entry[xKey] === "Recife"
                        ? colors[(index % colors.length) + 1]
                        : colors[index % colors.length];
                    return <Cell key={`cell-${dataIndex}`} fill={color} />;
                  })}
                </Bar>
              ))}
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StackerBarChartVertical;
