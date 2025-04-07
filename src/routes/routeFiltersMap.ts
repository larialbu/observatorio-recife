/** 
 * Aqui temos o nosso "mapa" de rotas para filtros. A ideia é colocar cada rota
 * como chave do objeto e, dentro dela, mapear as possíveis abas (tabs) para
 * diferentes conjuntos de filtros.
 */
import { defaultFilters } from "@/utils/filters/defaultFilters";
import { anacFilters } from "@/utils/filters/aeroporto/anacFilters";
import { aenaFilters } from "@/utils/filters/aeroporto/aenaFilters";
import { balancaComercialFilters } from "../utils/filters/balanca-comercial/balancaComercialFilters";
import { ipcaGeralFilters } from "@/utils/filters/ipca/ipcaGeralFilters";
import { ipcaGruposFilters } from "@/utils/filters/ipca/ipcaGruposFilters";
import { ipcaAnaliticoFilters } from "@/utils/filters/ipca/ipcaAnaliticoFilters";
import { rankingGeralFilters } from "@/utils/filters/ranking/rankingGeralFilters";
import { rankingDimensaoFilters } from "@/utils/filters/ranking/rankingDimensaoFilters";
import { rankingPilarFilters } from "@/utils/filters/ranking/rankingPilarFilters";
import { rankingIndicadorFilters } from "@/utils/filters/ranking/rankingIndicadorFilters";
import { anacComparativoFilters } from "@/utils/filters/aeroporto/anacComparativoFilters";
import { portoGeralFilters } from "@/utils/filters/porto/portoGeralFilters";
import { balancaComercialAnaliticoFilters } from "@/utils/filters/balanca-comercial/balancaComercialAnaliticoFilters";
import { portoComparativoFilters } from "@/utils/filters/porto/portoComparativoFilters";
import { portoPassageiroFilters } from "@/utils/filters/porto/portoPassageiroFilters";
import { pibGeralFilters } from "@/utils/filters/pib/pibGeralFilters";
import { pibComparativoFilters } from "@/utils/filters/pib/pibComparativoFilters";
import { pibCapitaFilters } from "@/utils/filters/pib/pibCapitaFilters";
import { empregosCagedFilters } from "@/utils/filters/empregos/empregosCagedFilters";
import { raisGeralFilters } from "@/utils/filters/rais/raisGeralFilters";
// Se houver outros filtros específicos pra outras rotas, importe eles também.

export const routeFiltersMap: Record<
  string, 
  Record<string, Record<string, any>> | Record<string, any>
> = {
    "/observatorio/ipca": {
      geral: ipcaGeralFilters,
      grupos: ipcaGruposFilters,
      analitico: ipcaAnaliticoFilters,
      // etc. Se quiser mesmo service, ok
    },

    "/observatorio/portos": {
      geral: portoGeralFilters,
      operacao: portoGeralFilters,
      comparativo: portoComparativoFilters,
      passageiros: portoPassageiroFilters,
      // etc. Se quiser mesmo service, ok
    },

    "/observatorio/ranking": {
      geral: rankingGeralFilters,
      dimensao: rankingDimensaoFilters,
      pilar: rankingPilarFilters,
      indicador: rankingIndicadorFilters,
      // etc. Se quiser mesmo service, ok
    },

  "/observatorio/aeroportos": {
    // Se estivermos em /observatorio/aeroportos, podemos ter
    // "geral" apontando para anacFilters, ou "aena" apontando para aenaFilters.
    geral: anacFilters,
    comparativo: anacComparativoFilters,
    embarque: anacFilters,
    aena: aenaFilters,
    // Se existirem outras tabs, adicione aqui.
  },

  "/observatorio/pib": {
    geral: pibGeralFilters,
    comparativo: pibComparativoFilters,
    capita: pibCapitaFilters,
  },

  "/observatorio/balanca-comercial": {
    geral: {
      ...balancaComercialFilters,
    },
    analitico: {
      ...balancaComercialAnaliticoFilters
    },
  },

  "/observatorio/empregos": {
    geral: empregosCagedFilters,
  },

  "/observatorio/rais": {
    geral: raisGeralFilters,
    desligamento: raisGeralFilters,
    diversidade: raisGeralFilters,
    grupo: raisGeralFilters,
  },

  // E assim por diante pra outras rotas...
};

/**
 * Se nenhuma rota ou aba for encontrada, usamos esse fallback
 * para não quebrar a aplicação.
 */
export const fallbackFilters = defaultFilters;