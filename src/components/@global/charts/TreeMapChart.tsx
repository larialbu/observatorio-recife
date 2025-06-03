import React, { PureComponent, useState } from 'react';
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
                    fill: depth < 2 ? colors[Math.floor((index / (root?.children?.length || 1)) * 6)] : '#ffffff00',
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
    const [percent, setPercent] = useState(false)

    // const totalValue = data.reduce((acc: number, entry: any) => acc + entry.value, 0);
    const totalValue = data.reduce((acc: number, entry: any) => acc + Math.abs(entry.value), 0);

    const calculatePercentage = (value: number) => {
        return ((value / totalValue) * 100).toFixed(2);
    };

    const customTooltipFormatter = (value: any) => {
        return tooltipFormatter(value, tooltipEntry || "");
    };

    const dataProcessed = data.map((entry: any) => ({
        ...entry,
        value: Math.abs(entry.value),
        isNegative: entry.value < 0
    }));


    return (
        <div className="w-full h-full">
            <div className="flex flex-col items-center justify-center">
                <h3 className="text-center mb-4 font-semibold w-[90%] text-gray-800 dark:text-gray-100">{title}</h3>
            </div>
            
            <div className='relative'>
                <button
                className="absolute top-2 left-3"
                onClick={() => setPercent(!percent)}
                >
                    <svg width="15px" height="15px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.7153 1.71609C18.3241 1.32351 18.3241 0.687013 18.7153 0.294434C19.1066 -0.0981448 19.7409 -0.0981448 20.1321 0.294434L22.4038 2.57397L22.417 2.58733C23.1935 3.37241 23.1917 4.64056 22.4116 5.42342L20.1371 7.70575C19.7461 8.09808 19.1122 8.09808 18.7213 7.70575C18.3303 7.31342 18.3303 6.67733 18.7213 6.285L20.0018 5L4.99998 5C4.4477 5 3.99998 5.44772 3.99998 6V13C3.99998 13.5523 3.55227 14 2.99998 14C2.4477 14 1.99998 13.5523 1.99998 13V6C1.99998 4.34315 3.34313 3 4.99998 3H19.9948L18.7153 1.71609Z" fill="#0F0F0F"/>
                    <path d="M22 11C22 10.4477 21.5523 10 21 10C20.4477 10 20 10.4477 20 11V18C20 18.5523 19.5523 19 19 19L4.00264 19L5.28213 17.7161C5.67335 17.3235 5.67335 16.687 5.28212 16.2944C4.8909 15.9019 4.2566 15.9019 3.86537 16.2944L1.59369 18.574L1.58051 18.5873C0.803938 19.3724 0.805727 20.6406 1.58588 21.4234L3.86035 23.7058C4.25133 24.0981 4.88523 24.0981 5.2762 23.7058C5.66718 23.3134 5.66718 22.6773 5.2762 22.285L3.99563 21L19 21C20.6568 21 22 19.6569 22 18L22 11Z" fill="#0F0F0F"/>
                    </svg>
                </button>

                <div className={`flex flex-wrap gap-2 justify-center space-x-4 border -mt-2 mb-4 rounded-md pt-6 pb-3 px-2  `}>
                    {data?.map((entry: any, index: number) => {
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
                                    {entry.label} ({percent ? `${percentage}%` : entry.value})
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            
            <div className='rounded-md overflow-hidden w-full'>
                <ResponsiveContainer width="100%" height={400}>
                    <Treemap 
                        // dataKey={'displayValue'}
                        dataKey={dataKey}
                        nameKey={xKey} 
                        content={<CustomizedContent colors={colors} />} 
                        width={400} 
                        height={200} 
                        data={dataProcessed}  
                        aspectRatio={4 / 3} 
                        stroke="#fff" 
                        fill="#8884d8"
                    >
                        <Tooltip
                            content={(e) => {
                                let isNegative = false
                                if (e?.payload?.[0]) {
                                    const label = e.payload[0].name  
                                    isNegative = dataProcessed.find((data: { label: string, value: number, isNegative: boolean}) => data.label === label ).isNegative
                                }

                                return CustomTooltip({...e, customTooltipFormatter, treeMap: true, isNegative})}}
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
