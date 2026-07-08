import Card from "@/components/@global/cards/Card";

const MesAnteriorCard = ({ data, year, color }: any) => {
  const value = data?.cards?.find((c: any) => c.title === "Mês anterior")?.value ?? "—";
  return <Card title="Mês Anterior" data={value} year={year ?? "—"} color={color} local="ANP" minWidth={200} />;
};

export default MesAnteriorCard;
