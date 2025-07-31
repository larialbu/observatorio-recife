import { fetchDataJwt } from "@/@api/config/fetchDataJwt";

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

  public static async fetchNews(): Promise<NewsItem[]> {
    const endpoint = "/news/newsData";
    return fetchDataJwt<NewsItem[]>(endpoint, this.cache);
  }

  public static clearCache(): void {
    this.cache = {};
  }
}