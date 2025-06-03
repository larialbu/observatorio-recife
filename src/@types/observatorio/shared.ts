export interface Filters<T = unknown> {
    year?: string;
    years?: string[];
    additionalFilters: AdditionalFilter[];
    extra?: T;
  }
  
export interface AdditionalFilter {
    options: string[];
    label: string;
    selected: string[];
    allowMultiple?: boolean;
    fixed?: string[];
    blocked?: boolean
    temp?: boolean
}

export interface DataWithFilters<T> {
    filteredData: T[];
    additionalFiltersOptions: AdditionalFilter[];
    rawData?: T[];
}

export interface Service<T> {
  setYear: (year: string) => void;
  fetchDataForTab: (tab: string, filters: Filters) => Promise<T>;
}

export interface ChartBuild<T = unknown> {
  data: T | (T | T);
  rawData?: T;
  colors?: string[];
  title?: string;
  months?: any;
  toCompare?: string[];
  monthRecent?: number;
  subText?: string;
  type?: "Embarque" | "Desembarque";
  nameKey?: string;
  year?: string;
  porto?: string; // TIRAR ESSA MERDA RALADA
  color?: string | string[]; // TIRAR ISSO AQUI QUE TEM EM PORTO
}

export interface CardComponent {
  Component: React.ElementType;
}

export interface CardBuild<T = unknown> {
  data: T;
  title?: string;
  year: string;
  color: string[] | string;
  capital?: string;
  local?: string;
  cards?: CardComponent[];
}