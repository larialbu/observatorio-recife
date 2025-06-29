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
  LabelList,
} from "recharts";

import { tooltipFormatter, yAxisFormatter } from "@/utils/formatters/@global/graphFormatter";

import CustomLegend from "../features/CustomLegend";
import CustomTooltip from "../features/CustomTooltip";

const StackerBarChartVertical = ({
  data,
  title,
  xKey,
  bars,
  colors = [],
  heightPerCategory = 50,
  visibleHeight = 300,
  tooltipEntry,
  left = -35,
  yFontSize = 12,
  maxDescriptionLength = 50,
  tooltipTitleFontSize,
  widthY = 150,
  showPercentage = true,
  minPercentageLabelWidth = 37, // mínimo % visual da barra para exibir label <- ajeitar isso aqui
}: any) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 640);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalHeight = data.length <= 5 ? 400 : data.length * heightPerCategory;

  const customTooltipFormatter = (value: any) => tooltipFormatter(value, tooltipEntry || "");

  const truncateForYAxis = (value: string) =>
    value.length > maxDescriptionLength ? value.substring(0, maxDescriptionLength) + "..." : value;

  // Mapeia totais por linha para cálculo de porcentagem
  const totalGlobal = data.reduce((total: number, entry: any) => {
    return (
      total +
      bars.reduce((sum: number, bar: any) => sum + (Number(entry[bar.dataKey]) || 0), 0)
    );
  }, 0);

  return (
    <div className="relative bg-white w-full dark:bg-[#0C1B2B]">
      {title &&       <div className="flex flex-col items-center justify-center">
        <h3 className="text-center mb-[2em] font-semibold w-[90%] text-gray-800 dark:text-gray-100">{title}</h3>
      </div>}

      <div
        className="overflow-y-auto overflow-x-visible"
        style={{ height: `${isSmallScreen ? 600 : visibleHeight}px` }}
      >
        <ResponsiveContainer width="100%" height={totalHeight}>
          <RechartsBarChart
            data={data}
            layout="vertical"
            margin={{ top: 0, right: 7, left, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              type="number" 
              tickFormatter={yAxisFormatter} 
              tick={{ fontSize: 12, fill: "var(--yaxis-tick-color)" }} 
              orientation="top" 
            />
            <YAxis
              type="category"
              dataKey={xKey}
              tick={{ fontSize: yFontSize, fill: "var(--yaxis-tick-color)" }}
              interval={0}
              width={widthY}
              tickFormatter={truncateForYAxis}
            />
            <Tooltip
              content={(e) => CustomTooltip({ ...e, customTooltipFormatter, fontSize: tooltipTitleFontSize })}
            />
            <Legend
              verticalAlign="top"
              align="center"
              iconSize={20}
              content={({ payload }) => (
                <div className="flex justify-center ml-10 mt-2 w-[90%]">
                  <CustomLegend payload={payload} />
                </div>
              )}
            />
            {bars.map((bar: any, barIndex: number) => (
              <Bar
                key={barIndex}
                dataKey={bar.dataKey}
                name={bar.name}
                stackId="stack"
                fill={colors[barIndex % colors.length]}
              >
                {data.map((entry: any, dataIndex: number) => {
                  const color =
                    entry[xKey] === "Recife"
                      ? colors[(barIndex % colors.length) + 1]
                      : colors[barIndex % colors.length];
                  return <Cell key={`cell-${dataIndex}`} fill={color} />;
                })}

                {bar.showPercentage && showPercentage && (
                  <LabelList
                  content={({ x = 0 as number, y = 0 as any, width = 0 as any, height = 0 as any, index }) => {
                    const entry = data[index!];
                    const valor = Number(entry[bar.dataKey]) || 0;
                    const percentual = totalGlobal ? (valor / totalGlobal) * 100 : 0;
                
                    if (percentual.toFixed(2) === "0.00") return null;
                
                    const isInside = width >= minPercentageLabelWidth;
                    const barColor = colors[barIndex % colors.length];
                    const anchor = isInside ? "end" : "start";
                
                    const val1 = Number(entry[bars[0].dataKey]) || 0;
                    const val2 = Number(entry[bars[1].dataKey]) || 0;
                    const totalStack = val1 + val2;
                
                    const stackPixelWidth = totalStack > 0 ? (1 / (valor / totalStack)) * width : width;
                
                    const width1 = totalStack > 0 ? (val1 / totalStack) * width : 0;
                    const width2 = totalStack > 0 ? (val2 / totalStack) * width : 0;
                    const primeiraFora = width1 < minPercentageLabelWidth;
                    const segundaFora = width2 < minPercentageLabelWidth;
                
                    let posX: number;

                    if (isInside) {
                      posX = x + width - 2;
                    } else {
                      posX = x + stackPixelWidth + 10;

                      if (barIndex === 1 && primeiraFora && segundaFora && val1 !== 0) {
                        posX += 45 - stackPixelWidth;

                      } else if (barIndex === 1 && segundaFora && val1 !== 0){
                        posX = x + stackPixelWidth - 25;
                      }

                    }
                
                    return (
                      <text
                        x={posX}
                        y={y + height / 2}
                        textAnchor={anchor}
                        dominantBaseline="middle"
                        fill={isInside ? "#fff" : barColor}
                        fontSize={12}
                        fontWeight={600}
                      >
                        {`${percentual.toFixed(2)}%`}
                      </text>
                    );
                  }}
                />
                
                
                
                
                )}
              </Bar>
            ))}

          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StackerBarChartVertical;
