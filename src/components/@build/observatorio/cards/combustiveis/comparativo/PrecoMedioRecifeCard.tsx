import Card from "@/components/@global/cards/Card";

const PrecoMedioRecifeCard = ({ data, year, color }: any) => {
  const value = data?.recife?.precoMedio ?? "—";
  return <Card title="Preço Médio - Recife" data={value} year={year ?? "—"} color={color} local="ANP" />;
};

export default PrecoMedioRecifeCard;
