import Card from "@/components/@global/cards/Card";

const VariacaoCard = ({ data, year, color }: any) => {
  const value = data?.cards?.find((c: any) => c.title === "Variação")?.value ?? 0;
  return <Card title="Variação" data={value} year={year ?? "—"} color={color} local="ITBI" percent />;
};

export default VariacaoCard;
