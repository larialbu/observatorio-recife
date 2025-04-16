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
    fixed?: string[]
}

export interface DataWithFilters<T> {
    filteredData: T[];
    additionalFiltersOptions: AdditionalFilter[];
    rawData?: T[];
    [key: string]: any;
}

export interface Service<T> {
  setYear: (year: string) => void;
  fetchDataForTab: (tab: string, filters: Filters) => Promise<T>;
}

export interface ChartBuild<T = unknown> {
  data: T;
  rawData?: T;
  colors?: string[];
  title?: string;
  months?: number;
  toCompare?: string[];
  monthRecent?: number;
  subText?: string;
  type?: "Embarque" | "Desembarque";
  nameKey?: string;
  year?: string;
}