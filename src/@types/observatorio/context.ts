import { Filters, DataWithFilters } from "./shared";

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
  data: DataWithFilters<T> | null;
  setData: React.Dispatch<React.SetStateAction<DataWithFilters<T> | null>>;
  isLoading: boolean;
  applyFilters: (newFilters: Filters) => Promise<void>;
  resetFilters: () => void;
  hiddenCharts: HiddenChart[];
  addHiddenChart: (chart: HiddenChart) => void;
  removeHiddenChart: (id: string) => void;
}
