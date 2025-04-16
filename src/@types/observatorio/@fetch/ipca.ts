export interface IpcaGeralHeaders {
    Ano: number;
    MÊS: number;
    Capital: string;
    "IPCA - Variação mensal": number;
    "IPCA - Variação acumulado no ano": number;
    "IPCA - Variação acumulada em 12 meses": number;
}

export interface IpcaGrupoHeaders {
    ANO: number;
    MÊS: number;
    Capital: string;
    Grupo: string;
    Subgrupo: string;
    Item: string;
    SubItem: string;
    Indice?: number;
}

export interface IpcaTabelaHeaders {
    Grupo: string;
    Capital: string;
    Acumulado: number;
    Mensal: number;
    Peso: number;
}  