import Card from "@/components/@global/cards/Card";

const VariacaoCard = ({ data, year, color }: any) => {
  const value = data?.cards?.find((c: any) => c.title === "Variação")?.value ?? "—";
  return <Card title="Variação" data={value} year={year ?? "—"} color={color} local="ANP" minWidth={200} />;
};

export default VariacaoCard;
