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
import CustomTooltip from "../features/CustomTooltip";
import CustomLegend from "../features/CustomLegend";
import { useEffect, useRef, useState } from "react";
import { truncateTextFormatter } from "@/utils/formatters/@global/truncateTextFormatter";

const splitDataInBlocks = (data: any[], blockSize: number = 100) => {
  const blocks: any[][] = [];
  
  for (let i = 0; i < data.length; i += blockSize) {
    blocks.push(data.slice(i, i + blockSize));
  }
  
  return blocks;
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
  maxDescriptionLength = 50, // Definir limite de caracteres para o eixo Y
}: any) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState("start");
  const [dataRead, setDataRead] = useState<any[]>([]);
  const [blocksCount, setBlocksCount] = useState(1);

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

  const totalHeight = Math.max(dataRead.length * heightPerCategory, 300);

  return (
    <div className="relative bg-white w-full">
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-center mb-4 font-semibold w-[90%]">{title}</h3>
      </div>

      <div
        ref={scrollRef}
        className="overflow-y-auto overflow-x-visible"
        style={{ height: `${visibleHeight}px` }}
      >
        <div>
          <ResponsiveContainer width="100%" height={totalHeight}>
            <RechartsBarChart
              data={dataRead}
              layout="vertical"
              margin={{ top: 0, right: 10, left: left, bottom: 5 }}
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

              {bars.map((bar: any, index: number) => (
                <Bar key={index} dataKey={bar.dataKey} name={bar.name} fill={colors[0]}>
                  {dataRead.map((entry: any, dataIndex: number) => (
                    <Cell
                      key={`cell-${dataIndex}`}
                      fill={entry[xKey]?.includes("Recife") 
                        ? colors[(index % colors.length) + 1] 
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
