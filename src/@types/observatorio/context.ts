import { BalancaGeralData } from "./@data/balancaComercialData";
import { AeroportoDataResult } from "./@data/aeroportoData";
import { IpcaDataResult } from "./@data/ipcaData";

import { Filters } from "./shared";

export type DashboardData = AeroportoDataResult | BalancaGeralData | IpcaDataResult;

export interface HiddenChart {
  id: string;
  category: string;
  title: string;
  subText?: string;
  component: React.ReactNode;
  wrapperElement: HTMLElement | null;
  originalDisplay: string;
  thumbnailUrl: string;
}

export interface DashboardContextProps<T> {
  filters: Filters;
  data: DashboardData | null;
  setData: React.Dispatch<React.SetStateAction<DashboardData | null>>;
  isLoading: boolean;
  applyFilters: (newFilters: Filters) => Promise<void>;
  resetFilters: () => void;
  hiddenCharts: HiddenChart[];
  addHiddenChart: (chart: HiddenChart) => void;
  removeHiddenChart: (id: string) => void;
}