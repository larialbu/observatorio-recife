import Card from "@/components/@global/cards/Card";

const TotalTransmissoesCard = ({ data, year, color }: any) => {
  const value = data?.cards?.find((c: any) => c.title === "Total de transmissões")?.value ?? 0;
  return <Card title="Total de Transmissões" data={value} year={year ?? "—"} color={color} local="ITBI" />;
};

export default TotalTransmissoesCard;
