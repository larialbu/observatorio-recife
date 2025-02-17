import React from "react";
import Card from "@/components/@global/cards/Card";
import { getLatestPibRecife } from "@/functions/process_data/observatorio/pib/geral/cards/pibRecife";

interface PibRecifeProps {
  data: any[]; // Dados brutos do PIB
  title?: string; // Título do card (opcional)
  color?: string; // Cor do card (opcional)
}

const PibRecife = ({ data, title = "PIB", color }: PibRecifeProps) => {
  try {
    // Processa os dados para obter o PIB de Recife no ano mais recente
    const latestPib = getLatestPibRecife(data);

    return (
      <Card
        local={"Recife - PE"} // Local fixo para Recife
        title={`${title}`} // Exibe o título com o ano mais recente
        data={latestPib.pib} // Valor do PIB
        year={latestPib.ano.toString()} // Ano mais recente
        color={color || "#1E90FF"} // Cor padrão se não for fornecida
        isPib={true} // Indica que este é um card de PIB
      />
    );
  } catch (error) {
    console.error("Erro ao processar dados do PIB de Recife:", error);

    // Renderiza um card de erro caso ocorra algum problema
    return (
      <Card
        local={"Recife - PE"}
        title="Erro ao carregar PIB"
        data="Dados indisponíveis"
        year="N/A"
        color="#FF4500" // Cor de erro
      />
    );
  }
};

export default PibRecife;