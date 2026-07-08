import Card from "@/components/@global/cards/Card";

const TotalPostosMunicipioCard = ({ data, year, color, municipio }: any) => {
  const value = data?.municipio?.postos ?? "—";
  return <Card title={`Total de Postos - ${municipio || "Município"}`} data={value} year={year ?? "—"} color={color} local="ANP" />;
};

export default TotalPostosMunicipioCard;
