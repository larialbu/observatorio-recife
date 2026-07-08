import Card from "@/components/@global/cards/Card";

const TotalPostosCard = ({ data, year, color }: any) => {
  const value = data?.recife?.postos ?? "—";
  return <Card title="Total de Postos - Recife" data={value} year={year ?? "—"} color={color} local="ANP" />;
};

export default TotalPostosCard;
