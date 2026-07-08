export interface CapagIndicador {
  valor: number;
  nota: string;
}

export interface CapagHistoricoAno {
  ano: string;
  endividamento: number;
  liquidez: number;
  poupancaCorrente: number;
}

export interface CapagMunicipioData {
  municipio: string;
  uf: string;
  notaGeral: string;
  endividamento: CapagIndicador;
  liquidez: CapagIndicador;
  poupancaCorrente: CapagIndicador;
  historico: CapagHistoricoAno[];
}

export interface CapagDataResult {
  id: "capag";
  geral?: {
    recife: CapagMunicipioData | null;
    comparado: CapagMunicipioData | null;
    additionalFiltersOptions?: any[];
  };
}
