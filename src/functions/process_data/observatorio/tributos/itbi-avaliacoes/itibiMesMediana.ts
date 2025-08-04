import { getMedian } from "@/utils/filters/@global/getMedian";
import { monthLongName } from "@/utils/formatters/@global/monthLongName";

export const processItbiMediana = (data: any, mes?: boolean) => {
    const monthsData = Object.keys(data) || []

    const chartData = monthsData.map((month) => ({
      label: month,
      value: getMedian(data?.[month] || [], 'valor_avaliacao') || 0,
    }))
    
    if (mes) {
        return chartData.sort((a, b) => +a.label - +b.label).map((dataMap) => ({ ...dataMap, label: monthLongName(+dataMap['label']) }));
    } else {
        return chartData.sort((a, b) => +b.value - +a.value)
    }
}