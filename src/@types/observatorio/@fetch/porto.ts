export interface PortoAtracacaoHeaders {
    Ano: number;
    IDAtracacao: number;
    Latitude: number;
    Longitude: number;
    Mes: number;
    Municipio_sigla: string;
    Município: string;
    "Porto Atracação": string;
    "Região Geográfica": string;
    SGUF: string;
    UF: string;
}

export interface PortoCargaHeaders {
    Ação: string;
    CDMercadoria: string;
    Destino: string;
    FlagMCOperacaoCarga: boolean;
    IDAtracacao: number;
    IDCarga: number;
    Origem: string;
    "Tipo Navegação": string;
    "Tipo Operação da Carga": string;
    VLPesoCargaBruta: number;
}

export interface PortoCoordHeaders {
    "Porto Atracação": string;
    Mes: bigint;
    VLPesoCargaBruta: number;
    Latitude: string;
    Longitude: string;
}

  export interface PortoMeses {
    current: [string, PortoCoordHeaders[]];
    past: [string, PortoCoordHeaders[]];
}

export interface PortoOrigemDestinoHeaders {
    BlocoEconomico_Origem?: string;
    CDBigramaOrigem?: string;
    CDTUPOrigem?: string;
    CDTrigramaOrigem?: string;
    "Cidade Origem"?: string;
    "Continente Origem"?: string;
    Origem: string;
    "Origem Nome"?: string;
    "País Origem"?: string;
    "Região Hidrográfica Origem"?: string;
    "Rio Origem"?: string;
    "UF.Origem"?: string;
}

export interface PortoDestinoHeaders extends Omit<PortoOrigemDestinoHeaders, "Origem" | "Origem Nome"> {
    Destino: string;
    "Nome Destino"?: string;
    "País Destino"?: string;
}

export interface PortoMercadoHeaders {
    CDMercadoria: string;
    CDNCMSH2: string;
    "Grupo de Mercadoria": string;
    Mercadoria: string;
    "Nomenclatura Simplificada Mercadoria": string;
    "Tipo Conteiner": string;
}


export interface PortoPassageirosHeaders {
    Ano: number;
    Data: string;
    Mes: number;
    Operação: string;
    Passageiros: number;
}