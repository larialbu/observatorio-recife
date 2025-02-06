import { RankingData } from "@/@api/http/to-charts/ranking/RankingData";
import { applyGenericFilters } from "@/utils/filters/@features/applyGenericFilters";

export class RankingDataService {
  private static instance: RankingDataService;
  private currentYear: string = "2024";
  private dataCache: Record<string, any> = {};

  private constructor() {}

  public static getInstance(): RankingDataService {
    if (!RankingDataService.instance) {
      RankingDataService.instance = new RankingDataService();
    }
    return RankingDataService.instance;
  }

  public setYear(year: string) {
    console.log(year)
    this.currentYear = year;
  }

  private getCacheKey(tab: string, filters: Record<string, any>): string {
    return `${tab}-${JSON.stringify(filters.additionalFilters)}`;
  }

  private async fetchRankingGeralData(filters: Record<string, any>) {
    const years = filters.years; // Lista de anos a serem buscados
    const geralDataByYear: Record<string, any[]> = {};

    // Busca os dados para todos os anos especificados
    for (const year of years) {
      const rankingService = new RankingData(year);
      const data = await rankingService.fetchProcessedGeralData();
      geralDataByYear[year] = data; // Organiza os dados por ano
    }

    // Aplica os filtros aos dados de cada ano sem interferir no ano selecionado
    const filteredData: Record<string, any> = {};
    Object.keys(geralDataByYear).forEach((year) => {
      // Aplica filtros apenas aos dados do ano específico
      filteredData[year] = applyGenericFilters(geralDataByYear[year], {
        ...filters,
        year,
      });
    });
    

    // Define os dados brutos com base no ano selecionado
    const rawData = geralDataByYear[this.currentYear] || [];
    const additionalFiltersOptions = applyGenericFilters(
      rawData,
      filters
    ).additionalFiltersOptions;

    const geral = {
      filteredData,
      rawData,
      additionalFiltersOptions,
    };

    console.log(geral);

    return { geral }; // Retorna os dados no formato especificado
  }

  private async fetchRankingDimensaoData(filters: Record<string, any>) {
    const years = filters.years; // Lista de anos a serem buscados
    const dimensaoDataByYear: Record<string, any[]> = {};
  
    // Busca os dados para todos os anos especificados
    for (const year of years) {
      const rankingService = new RankingData(year);
      const data = await rankingService.fetchProcessedDimensaoData();
      dimensaoDataByYear[year] = data; // Organiza os dados por ano
    }
  
    // Aplica os filtros aos dados de cada ano sem interferir no ano selecionado
    const filteredData: Record<string, any> = {};
    Object.keys(dimensaoDataByYear).forEach((year) => {
      // Aplica filtros apenas aos dados do ano específico
      filteredData[year] = applyGenericFilters(dimensaoDataByYear[year], {
        ...filters,
        year,
      });
    });
  
    // Filtrando com base na "Dimensão"
    const dimensaoFilter = filters.additionalFilters.find(
      (filter: any) => filter.label === "Dimensão"
    );
  
    // Define os dados brutos com base no filtro de "Dimensão"
    let rawData = [];
  
    if (dimensaoFilter && dimensaoFilter.selected) {
      const selectedDimensao = dimensaoFilter.selected; // Valores selecionados
      rawData = dimensaoDataByYear[this.currentYear].filter((data) => {
        // Verifica se o valor de Dimensão no rawData corresponde ao selecionado
        return selectedDimensao.includes(data.Dimensão); // Certifique-se de que selectedDimensao é um array
      });
    } else {
      rawData = dimensaoDataByYear[this.currentYear] || []; // Caso não tenha filtro, retorna todos os dados do ano
    }
  
    // Aplicando filtros adicionais
    const additionalFiltersOptions = applyGenericFilters(
      dimensaoDataByYear[this.currentYear],
      filters
    ).additionalFiltersOptions;
  
    // Estruturando o objeto final
    const dimensao = {
      filteredData, // Dados filtrados por ano
      rawData, // Dados brutos com base na "Dimensão"
      additionalFiltersOptions, // Opções de filtros adicionais
    };
  
    console.log(dimensao);
  
    // Retornando os dados no formato especificado
    return { dimensao };
  }
  


  private async fetchRankingIndicadorData(filters: Record<string, any>) {
    const years = filters.years; // Lista de anos a serem buscados
    const indicadorDataByYear: Record<string, any[]> = {};

    // Busca os dados para todos os anos especificados
    for (const year of years) {
      const rankingService = new RankingData(year);
      const data = await rankingService.fetchProcessedIndicadorData();
      indicadorDataByYear[year] = data; // Organiza os dados por ano
    }

    // Aplica os filtros aos dados de cada ano sem interferir no ano selecionado
    const filteredData: Record<string, any> = {};
    Object.keys(indicadorDataByYear).forEach((year) => {
      // Aplica filtros apenas aos dados do ano específico
      filteredData[year] = applyGenericFilters(indicadorDataByYear[year], {
        ...filters,
        year,
      });
    });

    const indicadorFilter = Object.values(filters.additionalFilters).find((item: any) => item.label === "Indicador") as any;
    console.log('ADPIFJSDOIFFOIÇJ', indicadorFilter.selected);



    // Declare rawData fora da condicional
    let rawData = [];

    if (indicadorFilter && indicadorFilter.selected) {
      const selectedindicador = indicadorFilter.selected; // Aqui você pega os valores selecionados
      rawData = indicadorDataByYear[this.currentYear].filter((data) => {
        // Verifica se o valor de indicador no rawData corresponde ao que foi selecionado
        return selectedindicador.includes(data.Indicador); // Verifique se selectedindicador é um array
      });
      console.log('ROWDATAFUNC111 sdfsdf', indicadorDataByYear[this.currentYear])
      console.log('ROWDATAFUNC1111', rawData)
    } else {
      rawData = indicadorDataByYear[this.currentYear] || []; // Caso não tenha filtro, retorna todos os dados do ano
      console.log('ROWDATAFUNC222', rawData)
    }

    // Definindo os dados brutos para o ano selecionado e filtrando com base no indicador
    console.log(rawData);

    // Aplicando filtros adicionais
    const additionalFiltersOptions = applyGenericFilters(indicadorDataByYear[this.currentYear], filters).additionalFiltersOptions;

    // Estruturando o objeto final
    const indicador = {
      filteredData,  // Certifique-se de que filteredData esteja definido corretamente antes
      rawData,
      additionalFiltersOptions
    };

    console.log(indicador);

    // Retornando os dados no formato especificado
    return { indicador };
  }

  private async fetchRankingPilarData(filters: Record<string, any>) {
    const years = filters.years; // Lista de anos a serem buscados
    const pilarDataByYear: Record<string, any[]> = {};

    // Busca os dados para todos os anos especificados
    for (const year of years) {
      const rankingService = new RankingData(year);
      const data = await rankingService.fetchProcessedPilaresData();
      pilarDataByYear[year] = data; // Organiza os dados por ano
    }

    // Aplica os filtros aos dados de cada ano sem interferir no ano selecionado
    const filteredData: Record<string, any> = {};
    Object.keys(pilarDataByYear).forEach((year) => {
      // Aplica filtros apenas aos dados do ano específico
      filteredData[year] = applyGenericFilters(pilarDataByYear[year], {
        ...filters,
        year,
      });
    });

    const pilarFilter = Object.values(filters.additionalFilters).find((item: any) => item.label === "Pilar") as any;
    console.log(pilarFilter.selected);

    // Declare rawData fora da condicional
    let rawData = [];

    if (pilarFilter && pilarFilter.selected) {
      const selectedPilar = pilarFilter.selected; // Aqui você pega os valores selecionados
      rawData = pilarDataByYear[this.currentYear].filter((data) => {
        // Verifica se o valor de Pilar no rawData corresponde ao que foi selecionado
        return selectedPilar.includes(data.Pilar); // Verifique se selectedPilar é um array
      });
    } else {
      rawData = pilarDataByYear[this.currentYear] || []; // Caso não tenha filtro, retorna todos os dados do ano
    }

    // Definindo os dados brutos para o ano selecionado e filtrando com base no Pilar
    console.log(rawData);

    // Aplicando filtros adicionais
    const additionalFiltersOptions = applyGenericFilters(pilarDataByYear[this.currentYear], filters).additionalFiltersOptions;

    // Estruturando o objeto final
    const pilar = {
      filteredData,  // Certifique-se de que filteredData esteja definido corretamente antes
      rawData,
      additionalFiltersOptions
    };

    console.log(pilar);

    // Retornando os dados no formato especificado
    return { pilar };
  }


  public async fetchDataForTab(tab: string, filters: Record<string, any>) {
    const cacheKey = this.getCacheKey(tab, filters);

    if (this.dataCache[cacheKey]) {
      return this.dataCache[cacheKey];
    }

    let data;
    if (tab === "dimensao") {
      data = await this.fetchRankingDimensaoData(filters);
    } else if (tab === "indicador") {
      data = await this.fetchRankingIndicadorData(filters);
    } else if (tab === "pilar") {
      data = await this.fetchRankingPilarData(filters);
    } else {
      data = await this.fetchRankingGeralData(filters);
    }

    this.dataCache[cacheKey] = data;
    return data;
  }
}

export const rankingDataService = RankingDataService.getInstance();
