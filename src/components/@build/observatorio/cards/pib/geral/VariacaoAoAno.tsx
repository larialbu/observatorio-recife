import React from "react";
import Card from "@/components/@global/cards/Card";
import { calculatePibVariation } from "@/functions/process_data/observatorio/pib/geral/cards/variacaoAoAno";

interface VarAnoProps {
  data2020: any[]; // Dados brutos do PIB para 2020
  data2021: any[]; // Dados brutos do PIB para 2021
  title?: string; // Título do card (opcional)
  color?: string; // Cor do card (opcional)
}

const VariacaoAoAno = ({ data2020, data2021, title = "Variação do PIB", color }: VarAnoProps) => {
  try {
    // Verifica se os dados são arrays
    console.log("Dados recebidos para 2020:", data2020);
    console.log("Dados recebidos para 2021:", data2021);

    if (!Array.isArray(data2020) || !Array.isArray(data2021)) {
      throw new Error("Os dados fornecidos devem ser arrays.");
    }

    // Calcula a variação percentual do PIB entre 2020 e 2021
    const variationData = calculatePibVariation(data2020, data2021);

    return (
      <Card
        local={"Recife - PE"} // Local fixo para Recife
        title={`${title} (${variationData.yearStart}-${variationData.yearEnd})`} // Exibe o título com o intervalo de anos
        data={`${variationData.variation}%`} // Valor da variação percentual
        year={`${variationData.yearStart} - ${variationData.yearEnd}`} // Intervalo de anos
        color={color || "#1E90FF"} // Cor padrão se não for fornecida
        isPib={false} // Indica que este não é um card de PIB diretamente
      />
    );
  } catch (error) {
    console.error("Erro ao processar dados da variação do PIB:", error);

    // Renderiza um card de erro caso ocorra algum problema
    return (
      <Card
        local={"Recife - PE"}
        title="Erro ao carregar variação do PIB"
        data="Dados indisponíveis"
        year="N/A"
        color="#FF4500" // Cor de erro
      />
    );
  }
};

export default VariacaoAoAno;