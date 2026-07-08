import Card from "@/components/@global/cards/Card";

const TotalContribuintesCard = ({ data, year, color }: any) => {
  const value = data?.cards?.find((c: any) => c.title === "Total de contribuintes")?.value ?? 0;
  return <Card title="Total de Contribuintes" data={value} year={year ?? "—"} color={color} local="IPTU" />;
};

export default TotalContribuintesCard;
