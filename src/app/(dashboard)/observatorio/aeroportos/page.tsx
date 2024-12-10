import apiConfig from "@/config/apiConfig";

// Interfaces para os dados
export interface AeroportoData {
  "AEROPORTO NOME": string;
  
  "NATUREZA": string;
  "GRUPO DE VOO": string;
  
}

export interface CompanyData {
  // Defina os campos para os dados das companhias
  [key: string]: any;
}

// Função para buscar dados de aeroportos
export const fetchAeroportoData = async (
  selectedYear: string
): Promise<AeroportoData[]> => {
  try {
    const response = await fetch(
      `${apiConfig.baseURL}/aeroporto/embarque-desembarque/${selectedYear}`
    );
    if (!response.ok) throw new Error("Erro ao buscar dados de aeroportos");
    return await response.json();
  } catch (error) {
    console.error("Erro em fetchAeroportoData:", error);
    throw error;
  }
};

// Função para buscar dados de companhias
export const fetchCompanyData = async (
  selectedYear: string
): Promise<CompanyData[]> => {
  try {
    const response = await fetch(
      `${apiConfig.baseURL}/aeroporto/${selectedYear}`
    );
    if (!response.ok) throw new Error("Erro ao buscar dados das companhias");
    return await response.json();
  } catch (error) {
    console.error("Erro em fetchCompanyData:", error);
    throw error;
  }
};
