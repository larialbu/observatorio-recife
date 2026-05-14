import { Filters } from "@/@types/observatorio/shared";

import { defaultFilters } from "@/utils/filters/defaultFilters";

import { aenaFilters } from "@/utils/filters/aeroporto/aenaFilters";
import { anacFilters } from "@/utils/filters/aeroporto/anacFilters";
import { anacComparativoFilters } from "@/utils/filters/aeroporto/anacComparativoFilters";

import { balancaComercialFilters } from "@/utils/filters/balanca-comercial/balancaComercialFilters";
import { balancaComercialAnaliticoFilters } from "@/utils/filters/balanca-comercial/balancaComercialAnaliticoFilters";

import { combustiveisFilters } from "@/utils/filters/combustiveis/combustiveisFilters";

import { empregosCagedFilters } from "@/utils/filters/empregos/empregosCagedFilters";
import { empregosDesempregoFilters } from "@/utils/filters/empregos/empregosDesempregoFilter";

import { empresasAbertasFechadasFilters } from "@/utils/filters/empresas/empresasAbertasFechadasFilters";
import { empresasAtivasFilters } from "@/utils/filters/empresas/empresasAtivasFilters";
import { empresasAtivasInativasFilters } from "@/utils/filters/empresas/empresasAtivasInativasFilters";
import { empresasClassesFilters } from "@/utils/filters/empresas/empresasClassesFilters";
import { empresasComparativoClasses } from "@/utils/filters/empresas/empresasComparativoClasses";
import { empresasGeralFilters } from "@/utils/filters/empresas/empresasGeralFilters";
import { empresasInativasFilters } from "@/utils/filters/empresas/empresasInativasFilters";
import { empresasNaturezasFilters } from "@/utils/filters/empresas/empresasNaturezasFilters";

import { ipcaAnaliticoFilters } from "@/utils/filters/ipca/ipcaAnaliticoFilters";
import { ipcaGeralFilters } from "@/utils/filters/ipca/ipcaGeralFilters";
import { ipcaGruposFilters } from "@/utils/filters/ipca/ipcaGruposFilters";

import { microCagedComparativoFilters } from "@/utils/filters/micro-caged/microCagedComparativoFilters";
import { microCagedComparativoMedFilters } from "@/utils/filters/micro-caged/microCagedComparativoMedFilters";
import { microCagedGeralFilters } from "@/utils/filters/micro-caged/microCagedGeralFilters";

import { pibCapitaFilters } from "@/utils/filters/pib/pibCapitaFilters";
import { pibComparativoFilters } from "@/utils/filters/pib/pibComparativoFilters";
import { pibGeralFilters } from "@/utils/filters/pib/pibGeralFilters";

import { portoComparativoFilters } from "@/utils/filters/porto/portoComparativoFilters";
import { portoGeralFilters } from "@/utils/filters/porto/portoGeralFilters";
import { portoPassageiroFilters } from "@/utils/filters/porto/portoPassageiroFilters";

import { raisGeralFilters } from "@/utils/filters/rais/raisGeralFilters";

import { rankingDimensaoFilters } from "@/utils/filters/ranking/rankingDimensaoFilters";
import { rankingGeralFilters } from "@/utils/filters/ranking/rankingGeralFilters";
import { rankingIndicadorFilters } from "@/utils/filters/ranking/rankingIndicadorFilters";
import { rankingPilarFilters } from "@/utils/filters/ranking/rankingPilarFilters";

type TabFiltersMap = Record<string, Filters>;

export const routeFiltersMap: Record<string, TabFiltersMap> = {
  "/observatorio/ipca": {
    geral: ipcaGeralFilters,
    grupos: ipcaGruposFilters,
    analitico: ipcaAnaliticoFilters,
  },

  "/observatorio/portos": {
    geral: portoGeralFilters,
    operacao: portoGeralFilters,
    comparativo: portoComparativoFilters,
    passageiro: portoPassageiroFilters,
    passageiros: portoPassageiroFilters,
  },

  "/observatorio/porto": {
    geral: portoGeralFilters,
    operacao: portoGeralFilters,
    comparativo: portoComparativoFilters,
    passageiro: portoPassageiroFilters,
    passageiros: portoPassageiroFilters,
  },

  "/observatorio/ranking": {
    geral: rankingGeralFilters,
    dimensao: rankingDimensaoFilters,
    pilar: rankingPilarFilters,
    indicador: rankingIndicadorFilters,
  },

  "/observatorio/ranking-municipios": {
    geral: rankingGeralFilters,
    dimensao: rankingDimensaoFilters,
    pilar: rankingPilarFilters,
    indicador: rankingIndicadorFilters,
  },

  "/observatorio/aeroportos": {
    geral: anacFilters,
    comparativo: anacComparativoFilters,
    embarque: anacFilters,
    aena: aenaFilters,
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
      ...balancaComercialAnaliticoFilters,
    },
  },

  "/observatorio/empregos": {
    geral: empregosCagedFilters,
    comparativo: empregosCagedFilters,
    desemprego: empregosDesempregoFilters,
  },

  "/observatorio/rais": {
    geral: raisGeralFilters,
    desligamento: raisGeralFilters,
    diversidade: raisGeralFilters,
    grupo: raisGeralFilters,
    estoque: raisGeralFilters,
    remuneracao: raisGeralFilters,
  },

  "/observatorio/micro-caged": {
    geral: microCagedGeralFilters,
    saldo: microCagedGeralFilters,
    media: microCagedGeralFilters,
    "comparativo-mov": microCagedComparativoFilters,
    "comparativo-med": microCagedComparativoMedFilters,
    salario: microCagedComparativoFilters,
  },

  "/observatorio/empresas": {
    geral: empresasGeralFilters,
    "empresas-ativas": empresasAtivasFilters,
    "empresas-inativas": empresasInativasFilters,
    "empresas-ativas-inativas": empresasAtivasInativasFilters,
    "empresas-naturezas": empresasNaturezasFilters,
    "empresas-classes": empresasClassesFilters,
    "comparativo-empresas-classes": empresasComparativoClasses,
    "empresas-abertas-fechadas": empresasAbertasFechadasFilters,
    "empresas-tempo-abertura": empresasAbertasFechadasFilters,
  },

  "/observatorio/combustiveis": {
    geral: combustiveisFilters,
    comparativo: combustiveisFilters,
    regional: combustiveisFilters,
    estadual: combustiveisFilters,
    municipal: combustiveisFilters,
  },
};

export const fallbackFilters = defaultFilters;
