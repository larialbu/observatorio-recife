export interface AnacGeralHeaders {
    "AEROPORTO NOME": string;
    "AEROPORTO REGIÃO": string;
    "AEROPORTO UF": string;
    "ANO": number;
    "MÊS": number;
    "DATA": string;
    "DECOLAGENS": number;
    "PASSAGEIRO": number;
    "CARGA": number;
    "GRUPO DE VOO": string;
    "NATUREZA": string;
    "TIPO": string;
    "Origem": string;
    "Destino": string;
    "País Origem": string;
    "País Destino": string;
    "UF Origem": string;
    "UF Destino": string;
}

export interface AenaCargasHeaders {
    Data: string;
    Tipo: string;
    Aeroporto: string;
    Quantidade: number;
    Ano: number;
    Mês: number;
}

export interface AenaPassageirosHeaders {
    Data: string;
    Tipo: "Embarque" | "Desembarque";
    Aeroporto: string;
    Passageiros: number;
    Ano: number;
    Mês: number;
    Escala: "Sem Escala" | "Conexão";
    "Classificacao da Viagem": "Doméstico" | "Internacional";
}