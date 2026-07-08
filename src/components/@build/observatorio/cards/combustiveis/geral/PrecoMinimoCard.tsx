import Card from "@/components/@global/cards/Card";

const PrecoMinimoCard = ({ data, year, color }: any) => {
  const value = data?.cards?.find((c: any) => c.title === "Preço mínimo")?.value ?? "—";
  return <Card title="Preço Mínimo" data={value} year={year ?? "—"} color={color} local="ANP" minWidth={200} />;
};

export default PrecoMinimoCard;
