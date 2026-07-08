import Card from "@/components/@global/cards/Card";

const MenorAvaliacaoCard = ({ data, year, color }: any) => {
  const value = data?.cards?.find((c: any) => c.title === "Menor avaliação")?.value ?? 0;
  return <Card title="Menor Avaliação" data={value} year={year ?? "—"} color={color} local="ITBI" />;
};

export default MenorAvaliacaoCard;
