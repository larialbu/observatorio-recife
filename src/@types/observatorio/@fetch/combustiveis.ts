export type AnpCombustiveisHeaders = {
  ano: number;
  mes: number;
  data?: string;
  regiao: string;
  estado: string;
  estadoNome?: string;
  municipio: string;
  produto: string;
  precoMedio: number;
  precoMinimo: number;
  precoMaximo: number;
  postos: number;
  unidade?: string;
  capital?: string;
};