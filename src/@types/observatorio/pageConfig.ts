import pagesData from '../../../public/pagination.json';

interface TabConfig {
  label: string;
  path: string;
  status: boolean;
}

interface PageConfig {
  path: string;
  status: boolean;
  tabs: TabConfig[];
}

interface AppConfig {
  observatorio: Record<string, PageConfig>;
}

export const pagesConfig: AppConfig = pagesData;