import Card from "@/components/@global/cards/Card";

const PrecoMaximoCard = ({ data, year, color }: any) => {
  const value = data?.cards?.find((c: any) => c.title === "Preço máximo")?.value ?? "—";
  return <Card title="Preço Máximo" data={value} year={year ?? "—"} color={color} local="ANP" minWidth={200} />;
};

export default PrecoMaximoCard;
