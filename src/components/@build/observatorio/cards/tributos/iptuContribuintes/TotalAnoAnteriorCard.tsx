import Card from "@/components/@global/cards/Card";

const TotalAnoAnteriorCard = ({ data, year, color }: any) => {
  const value = data?.cards?.find((c: any) => c.title === "Total no ano anterior")?.value ?? 0;
  return <Card title="Total no Ano Anterior" data={value} year={year ?? "—"} color={color} local="IPTU" />;
};

export default TotalAnoAnteriorCard;
