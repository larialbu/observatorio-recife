import Card from "@/components/@global/cards/Card";

const TotalIptuCard = ({ data, year, color }: any) => {
  const value = data?.cards?.find((c: any) => c.title === "Total do IPTU")?.value ?? 0;
  return <Card title="Total do IPTU" data={value} year={year ?? "—"} color={color} local="IPTU" minWidth={230} />;
};

export default TotalIptuCard;
