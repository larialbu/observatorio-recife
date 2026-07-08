import Card from "@/components/@global/cards/Card";

const PrecoMedioMunicipioCard = ({ data, year, color, municipio }: any) => {
  const value = data?.municipio?.precoMedio ?? "—";
  return <Card title={`Preço Médio - ${municipio || "Município"}`} data={value} year={year ?? "—"} color={color} local="ANP" />;
};

export default PrecoMedioMunicipioCard;
