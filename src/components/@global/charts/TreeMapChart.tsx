import React, { PureComponent } from 'react';
import { Treemap, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import CustomLegend from '../features/CustomLegend';
import CustomTooltip from '../features/CustomTooltip';
import { tooltipFormatter } from '@/utils/formatters/@global/graphFormatter';

const CustomizedContent = ({ root, depth, x, y, width, height, index, payload, colors, rank, label }: any) => {
    const MIN_SIZE = 70;

    const adjustedWidth = Math.max(width, MIN_SIZE);
    const adjustedHeight = Math.max(height, MIN_SIZE);

    const shouldDisplayText = adjustedWidth > MIN_SIZE && adjustedHeight > MIN_SIZE;

    return (
        <g>
            <rect
                x={x}
                y={y}
                width={adjustedWidth}
                height={adjustedHeight}
                style={{
                    fill: depth < 2 ? colors[Math.floor((index / root.children.length) * 6)] : '#ffffff00',
                    strokeOpacity: 0,
                }}
            />
            {depth === 1 && shouldDisplayText ? (
                <text x={x + adjustedWidth / 2} y={y + adjustedHeight / 2 + 7} textAnchor="middle" fill="#fff" fontSize={14}>
                    {label}
                </text>
            ) : null}
        </g>
    );
};

const TreeMapChart = ({ 
    data, 
    title, 
    colors, 
    xKey,
    dataKey, 
    bars,
    tooltipEntry
}: any) => {

    const totalValue = data.reduce((acc: number, entry: any) => acc + entry.value, 0);

    const calculatePercentage = (value: number) => {
        return ((value / totalValue) * 100).toFixed(2);
    };

    const customTooltipFormatter = (value: any) => {
        return tooltipFormatter(value, tooltipEntry || "");
    };

    return (
        <div className="relative w-full h-full">
            <h3 className="text-center mb-4 font-semibold">{title}</h3>
            <div className={`flex flex-wrap gap-2 justify-center space-x-4 border -mt-2 mb-4 rounded-md p-2`}>
                {data?.map((entry: any, index: number) => {
                    // Calcular a porcentagem para cada item
                    const percentage = calculatePercentage(entry.value);

                    return (
                        <div key={index} className="flex items-center justify-center gap-1 text-xs">
                            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: colors[index] }}></span>
                            <span
                                className="text-xs font-semibold"
                                style={{
                                    color: colors[index],
                                }}
                            >
                                {entry.label} ({percentage}%) {/* Exibe a porcentagem */}
                            </span>
                        </div>
                    );
                })}
            </div>
            
            <div className='rounded-md overflow-hidden w-full'>
                <ResponsiveContainer width="100%" height={400}>
                    <Treemap 
                        dataKey={dataKey}
                        nameKey={xKey} 
                        content={<CustomizedContent colors={colors} />} 
                        width={400} 
                        height={200} 
                        data={data}  
                        aspectRatio={4 / 3} 
                        stroke="#fff" 
                        fill="#8884d8"
                    >
                        <Tooltip
                            content={(e) => CustomTooltip({...e, customTooltipFormatter, treeMap: true})}
                        />
                        <Legend 
                            verticalAlign="top" 
                            align="center"
                            content={({ payload }) => { 
                                return <CustomLegend payload={payload}/> 
                            }}
                            iconSize={20}
                        />
                    </Treemap>
                </ResponsiveContainer>
            </div>

        </div>
    );
};

export default TreeMapChart;
