import { useEffect, useRef, useState } from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer
} from "recharts";

import { tooltipFormatter, yAxisFormatter } from "@/utils/formatters/@global/graphFormatter";

import CustomLegend from "../features/CustomLegend";
import CustomTooltip from "../features/CustomTooltip";
import { resizeDiv } from "../features/resizeDiv";

const splitDataInBlocks = (data: any[], blockSize: number = 100) => {
  const blocks: any[][] = [];

  for (let i = 0; i < data.length; i += blockSize) {
    blocks.push(data.slice(i, i + blockSize));
  }

  return blocks;
};

// Capitaliza o texto (siglas de 2 letras ficam em maiúsculo), sem cortar o nome
const formatLabel = (value: string) => {
  if (!value) return "";
  if (value.length === 2) return value.toUpperCase();
  const lower = value.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
};

// Quebra o texto em múltiplas linhas para caber na largura do eixo sem cortar nada
const wrapLabelLines = (text: string, maxCharsPerLine: number) => {
  const words = text.split(" ").filter(Boolean);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxCharsPerLine && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);

  return lines.length ? lines : [""];
};

const VerticalScrollableBarChart = ({
  data,
  title,
  xKey,
  bars,
  colors = [],
  heightPerCategory = 50,  
  visibleHeight = 400, 
  widthY = 100,
  left = -5,
  yFontSize = 12,
  highlightValues = ["Recife"],
  highlightColor,
}: any) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [width, setWidth] = useState<number | null>(null);
  const [scrollPosition, setScrollPosition] = useState("start");
  const [dataRead, setDataRead] = useState<any[]>([]);
  const [blocksCount, setBlocksCount] = useState(1);

  resizeDiv(containerRef, width, setWidth)

  useEffect(() => {
    const blocks = splitDataInBlocks(data);
    setDataRead(blocks[0] || []);
    setBlocksCount(1);
  }, [data]);  

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;

      if (scrollTop === 0) {
        setScrollPosition("start");
      } else if (scrollTop + clientHeight >= scrollHeight) {
        setScrollPosition("end");

        setBlocksCount((prev) => {
          if (prev < splitDataInBlocks(data).length) {
            setDataRead(data.slice(0, (prev + 1) * 100));
            return prev + 1;
          }
          return prev;
        });
      } else {
        setScrollPosition("middle");
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [dataRead]); 

  const lineHeight = yFontSize + 3;
  const charsPerLine = Math.max(6, Math.floor((widthY - 16) / (yFontSize * 0.62)));

  const wrappedLabels = dataRead.reduce((acc: Record<string, string[]>, entry: any) => {
    const raw = String(entry?.[xKey] ?? "");
    if (!(raw in acc)) acc[raw] = wrapLabelLines(formatLabel(raw), charsPerLine);
    return acc;
  }, {} as Record<string, string[]>);

  const maxLines = Object.values(wrappedLabels).reduce((max: number, lines: string[]) => Math.max(max, lines.length), 1);
  const effectiveHeightPerCategory = Math.max(heightPerCategory, maxLines * lineHeight + 14);

  const totalHeight = Math.max(dataRead.length * effectiveHeightPerCategory, 300);

  const renderYAxisTick = ({ x, y, payload }: any) => {
    const lines = wrappedLabels[String(payload.value)] ?? [formatLabel(String(payload.value))];
    const startOffset = -((lines.length - 1) * lineHeight) / 2;

    return (
      <g transform={`translate(${x},${y})`}>
        <text textAnchor="end" fontSize={yFontSize} fill="var(--yaxis-tick-color)">
          {lines.map((line, i) => (
            <tspan key={i} x={0} dy={i === 0 ? startOffset : lineHeight}>
              {line}
            </tspan>
          ))}
        </text>
      </g>
    );
  };

  return (
    <div ref={containerRef} className="relative bg-white w-full dark:bg-[#0C1B2B]">
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-center mb-4 font-semibold w-[90%] text-gray-800 dark:text-gray-100">{title}</h3>
      </div>

      <div
        ref={scrollRef}
        className="overflow-y-auto overflow-x-visible"
        style={{ height: `${visibleHeight}px` }}
      >
        <div>
          <ResponsiveContainer width={(width || 0) - 5} height={totalHeight}>
            <RechartsBarChart
              data={dataRead}
              layout="vertical"
              margin={{ top: 0, right: 10, left: left, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.5} />
              <XAxis
                type="number"
                tickFormatter={yAxisFormatter}
                tick={{ fontSize: 12, fill: "var(--yaxis-tick-color)" }}
                orientation="top"
              />
              <YAxis
                type="category"
                dataKey={xKey}
                tick={renderYAxisTick}
                interval={0}
                width={widthY}
              />
              <Tooltip content={(e) => CustomTooltip({ ...e, customTooltipFormatter: tooltipFormatter })} />

              <Legend 
                verticalAlign="top" 
                align="center"
                content={({ payload }) => (
                  <div className="flex justify-center ml-10 mt-2 w-[90%]">
                    <CustomLegend payload={payload} />
                  </div>
                )}
                iconSize={20}
              />

              {/* <Legend 
                verticalAlign="top" 
                align="center"
                content={({ payload }) => (
                    <div className="pl-5 mt-2 w-[100%]">
                      <CustomLegend payload={payload} />
                    </div>
                )}
                iconSize={20}
              />

              <Legend 
                verticalAlign="top" 
                align="center"
                content={({ payload }) => <CustomLegend payload={payload} />}
                iconSize={20}
              /> */}

              {bars.map((bar: any, index: number) => (
                <Bar key={index} dataKey={bar.dataKey} name={bar.name} fill={colors[0]} radius={[0, 6, 6, 0]} maxBarSize={28}>
                  {dataRead.map((entry: any, dataIndex: number) => (
                    <Cell
                      key={`cell-${dataIndex}`}
                      fill={highlightValues.some((v: string) => entry[xKey]?.includes(v))
                        ? (highlightColor ?? colors[(index % colors.length) + 1])
                        : colors[index % colors.length]}
                    />
                  ))}
                </Bar>
              ))}
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default VerticalScrollableBarChart;
