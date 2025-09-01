import { monthShortName } from "@/utils/formatters/@global/monthShortName";

export const processRawAccumulator = (data: Record<string, Record<string, Record<string, number>>>, principal: string, param: string) => {
   return Object.entries(data?.[principal] || {}).map(([key, value]) => ({
    label: key || "Indefinido",
    value: value?.[param] || 0,
  })).sort((a, b) => +a.label > 0 ? +a.label - +b.label : b.value - a.value).map(obj => ({ ...obj, label: +obj.label > 0 ? monthShortName(+obj.label) : obj.label }));
}