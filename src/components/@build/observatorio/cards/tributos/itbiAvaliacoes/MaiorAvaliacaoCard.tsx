import Card from "@/components/@global/cards/Card";

const MaiorAvaliacaoCard = ({ data, year, color }: any) => {
  const value = data?.cards?.find((c: any) => c.title === "Maior avaliação")?.value ?? 0;
  return <Card title="Maior Avaliação" data={value} year={year ?? "—"} color={color} local="ITBI" />;
};

export default MaiorAvaliacaoCard;
