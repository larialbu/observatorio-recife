import Card from "@/components/@global/cards/Card";

const PrecoMedioCard = ({ data, year, color }: any) => {
  const value = data?.cards?.find((c: any) => c.title === "Preço médio")?.value ?? "—";
  return <Card title="Preço Médio" data={value} year={year ?? "—"} color={color} local="ANP" minWidth={200} />;
};

export default PrecoMedioCard;
