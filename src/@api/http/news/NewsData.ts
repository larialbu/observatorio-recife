import { fetchData } from "@/@api/config/dataFetcher";

export interface NewsItem {
    id: number;
    title: string;
    description: string;
    image: string;
    date: string;
    link: string;
  }

export class NewsData {
  private static cache: Record<string, any> = {}; 
  
  async fetchNews(): Promise<NewsItem[]> {
    this.clearCache();
    const timestamp = new Date().getTime();
    const endpoint = `/news/newsData?timestamp=${timestamp}`;
    return fetchData<NewsItem[]>(endpoint, NewsData.cache);
  }

  clearCache(): void {
    NewsData.cache = {};
  }
}

