"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

import {
  AdditionalFilter,
  Filters,
} from "@/@types/observatorio/shared";

import { useDashboard } from "@/context/DashboardContext";

import { ChevronIcon } from "./ChevronIcon";
import FocusHidden from "../@global/features/FocusHidden";

type CombustivelFiltroRow = {
  estado?: string;
  municipio?: string;
};

type DropdownState = Record<string, boolean>;
type SearchState = Record<string, string>;

function normalizarTexto(value: unknown) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

function isEstadoFilter(label: string) {
  return normalizarTexto(label) === "estado";
}

function isMunicipioFilter(label: string) {
  return normalizarTexto(label) === "municipio";
}

function arraysIguais(a: string[] = [], b: string[] = []) {
  if (a.length !== b.length) return false;
  return a.every((item, index) => item === b[index]);
}

function extrairRowsDeJson(data: unknown): CombustivelFiltroRow[] {
  if (Array.isArray(data)) return data as CombustivelFiltroRow[];

  if (!data || typeof data !== "object") return [];

  const obj = data as Record<string, unknown>;
  const possibleKeys = ["data", "rows", "items", "results", "dados"];

  for (const key of possibleKeys) {
    const value = obj[key];

    if (Array.isArray(value)) {
      return value as CombustivelFiltroRow[];
    }

    if (value && typeof value === "object") {
      const nested = extrairRowsDeJson(value);

      if (nested.length > 0) return nested;
    }
  }

  return [];
}

function ordenarOpcoes(options: string[]) {
  return [...options].sort((a, b) => {
    if (a === "Todos") return -1;
    if (b === "Todos") return 1;

    const numA = Number(a);
    const numB = Number(b);

    if (Number.isFinite(numA) && Number.isFinite(numB)) {
      return numA - numB;
    }

    return a.localeCompare(b, "pt-BR", { sensitivity: "base" });
  });
}

function getResumoFiltro(filter: AdditionalFilter) {
  const selected = filter.selected || [];

  if (selected.length === 0) return "Nenhum selecionado";

  if (selected.length === 1) {
    const value = selected[0];

    return filter.hash ? String(filter.hash[value] ?? value) : value;
  }

  return `${selected.length} selecionado(s)`;
}

export default function Navbar() {
  const pathname = usePathname();
  const isCombustiveisPage = pathname.includes("/observatorio/combustiveis");

  const { filters, applyFilters, resetFilters } = useDashboard();

  const [tempFilters, setTempFilters] = useState<Filters>(filters);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [dropdowns, setDropdowns] = useState<DropdownState>({});
  const [searchTerms, setSearchTerms] = useState<SearchState>({});
  const [showInitialMessage, setShowInitialMessage] = useState(true);
  const [combustiveisRows, setCombustiveisRows] = useState<
    CombustivelFiltroRow[]
  >([]);

  const estadoSelecionadoKey = useMemo(() => {
    return (
      tempFilters?.additionalFilters
        ?.find((filter: AdditionalFilter) => isEstadoFilter(filter.label))
        ?.selected?.join("|") || ""
    );
  }, [tempFilters]);

  useEffect(() => {
    setTempFilters(filters);

    const hasAllowMultipleFalse = filters.additionalFilters?.some(
      (filter: AdditionalFilter) => filter.allowMultiple === false
    );

    setShowInitialMessage(!hasAllowMultipleFalse);
  }, [filters]);

  useEffect(() => {
    if (!isCombustiveisPage) return;

    let ativo = true;

    async function carregarMunicipiosCombustiveis() {
      try {
        const response = await fetch("/api/data/combustiveis/fast", {
          cache: "force-cache",
        });

        if (!response.ok) {
          console.error("Erro ao carregar municípios de combustíveis.");
          return;
        }

        const json = await response.json();
        const rows = extrairRowsDeJson(json);

        if (ativo) {
          setCombustiveisRows(rows);
        }
      } catch (error) {
        console.error("Erro ao montar filtro de municípios:", error);
      }
    }

    carregarMunicipiosCombustiveis();

    return () => {
      ativo = false;
    };
  }, [isCombustiveisPage]);

  useEffect(() => {
    if (!isCombustiveisPage) return;
    if (!combustiveisRows.length) return;

    setTempFilters((prev: Filters) => {
      if (!prev?.additionalFilters?.length) return prev;

      const estadoFilter = prev.additionalFilters.find((filter) =>
        isEstadoFilter(filter.label)
      );

      const estadosSelecionados =
        estadoFilter?.selected?.length &&
        !estadoFilter.selected.includes("Todos")
          ? estadoFilter.selected
          : [];

      const municipios = Array.from(
        new Set(
          combustiveisRows
            .filter((row) => {
              const estado = String(row.estado ?? "").trim();

              if (estadosSelecionados.length === 0) return true;

              return estadosSelecionados.includes(estado);
            })
            .map((row) => String(row.municipio ?? "").trim())
            .filter(Boolean)
        )
      ).sort((a, b) => a.localeCompare(b, "pt-BR"));

      const municipioOptions = ["Todos", ...municipios];

      const additionalFiltersAtualizados = prev.additionalFilters.map(
        (filter) => {
          if (!isMunicipioFilter(filter.label)) return filter;

          const selectedAtual = filter.selected?.length
            ? filter.selected
            : ["Todos"];

          const selectedCorrigido = selectedAtual.includes("Todos")
            ? ["Todos"]
            : selectedAtual.filter((item) => municipioOptions.includes(item));

          const selectedFinal = selectedCorrigido.length
            ? selectedCorrigido
            : ["Todos"];

          if (
            arraysIguais(filter.options, municipioOptions) &&
            arraysIguais(filter.selected, selectedFinal)
          ) {
            return filter;
          }

          return {
            ...filter,
            options: municipioOptions,
            selected: selectedFinal,
          };
        }
      );

      return {
        ...prev,
        additionalFilters: additionalFiltersAtualizados,
      };
    });
  }, [isCombustiveisPage, combustiveisRows, estadoSelecionadoKey]);

  const hideInitialMessage = () => {
    if (showInitialMessage) {
      setShowInitialMessage(false);
    }
  };

  const toggleFiltersVisible = () => {
    setFiltersVisible((prev) => !prev);
  };

  const toggleDropdown = (label: string) => {
    setDropdowns((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const handleCheckboxChange = (label: string, option: string) => {
    setTempFilters((prev: Filters) => {
      const updated = prev.additionalFilters.map((filter: AdditionalFilter) => {
        if (filter.label !== label) return filter;

        const isAllowMultiple = filter.allowMultiple !== false;

        if (!isAllowMultiple) {
          return {
            ...filter,
            selected: [option],
          };
        }

        if (option === "Todos") {
          return {
            ...filter,
            selected: filter.selected.includes("Todos") ? [] : ["Todos"],
          };
        }

        const selectedSemTodos = filter.selected.filter(
          (item: string) => item !== "Todos"
        );

        const isSelected = selectedSemTodos.includes(option);

        const selected = isSelected
          ? selectedSemTodos.filter((item: string) => item !== option)
          : [...selectedSemTodos, option];

        return {
          ...filter,
          selected,
        };
      });

      return {
        ...prev,
        additionalFilters: updated,
      };
    });
  };

  const handleSelectAll = (label: string) => {
    setTempFilters((prev: Filters) => {
      const updated = prev.additionalFilters.map((filter: AdditionalFilter) => {
        if (filter.label !== label) return filter;

        const allSelected = filter.selected.length === filter.options.length;

        return {
          ...filter,
          selected: allSelected ? [] : [...filter.options],
        };
      });

      return {
        ...prev,
        additionalFilters: updated,
      };
    });
  };

  const handleSearchChange = (label: string, value: string) => {
    setSearchTerms((prev) => ({
      ...prev,
      [label]: value,
    }));
  };

  const onApplyFilters = () => {
    hideInitialMessage();
    applyFilters(tempFilters);
    setFiltersVisible(false);
  };

  const onResetFilters = () => {
    hideInitialMessage();
    resetFilters();
  };

  const resumoAno =
    filters.year || (filters.years && filters.years[filters.years.length - 1]);

  return (
    <>
      {navVisible && (
        <div className="sticky top-0 z-50 w-full bg-[#e5e7eb] px-4 py-2 shadow-sm dark:bg-[#07111f]">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              toggleFiltersVisible();
            }}
            className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 dark:border-gray-600 dark:bg-[#0C1B2B] dark:text-gray-200"
          >
            {filtersVisible ? "Esconder Filtros" : "Exibir Filtros"}
            <ChevronIcon up={filtersVisible} />
          </button>

          <div className="mt-2 w-fit max-w-full rounded-lg bg-white px-4 py-4 shadow-md dark:bg-[#0C1B2B]">
            <h3 className="mb-3 text-lg font-semibold text-slate-800 dark:text-white">
              Filtros selecionados:
            </h3>

            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-600 dark:text-slate-300">
              <span>
                Ano: <strong>{resumoAno || "Todos"}</strong>
              </span>

              {filters.additionalFilters?.map((filter: AdditionalFilter) => {
                if (!filter.selected?.length) return null;

                const visible = filter.hash
                  ? filter.selected
                      .map((item) => filter.hash?.[item] ?? item)
                      .slice(0, 5)
                      .join(", ")
                  : filter.selected.slice(0, 5).join(", ");

                const remaining = filter.selected.length - 5;

                return (
                  <span key={filter.label}>
                    {filter.label}: <strong>{visible}</strong>
                    {remaining > 0 && ` ... e outros ${remaining}`}
                  </span>
                );
              })}
            </div>

            {showInitialMessage && (
              <p className="mt-3 text-xs text-red-600">
                Para consultar todos os dados: limpe, selecione Estado e
                Município como Todos ou{" "}
                <button
                  type="button"
                  onClick={onResetFilters}
                  className="underline"
                >
                  clique aqui.
                </button>
              </p>
            )}
          </div>

          {filtersVisible && tempFilters && (
            <FocusHidden
              open={filtersVisible}
              setOpen={setFiltersVisible}
              style="absolute left-3 z-50 mt-2 w-fit min-w-[920px] max-w-[1180px] rounded-md bg-white p-5 shadow-lg dark:bg-[#0C1B2B]"
            >
              <div className="w-full">
                <h2 className="mb-5 text-lg font-semibold text-slate-800 dark:text-white">
                  Filtros
                </h2>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-3 xl:grid-cols-[170px_170px_190px_190px_250px]">
                  <div>
                    <label className="mb-1 block text-xs font-bold uppercase text-slate-500 dark:text-slate-300">
                      Ano
                    </label>

                    <select
                      value={
                        tempFilters.year ||
                        tempFilters.years?.[tempFilters.years.length - 1] ||
                        ""
                      }
                      onChange={(event) => {
                        setTempFilters((prev) => ({
                          ...prev,
                          year: event.target.value,
                        }));
                      }}
                      className="w-full rounded-md border px-3 py-2 text-sm dark:border-gray-600 dark:bg-[#182e46] dark:text-gray-300"
                    >
                      {tempFilters.years?.map((year: string) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>

                  {tempFilters.additionalFilters?.map(
                    (filter: AdditionalFilter) => {
                      const searchTerm = searchTerms[filter.label] || "";

                      const options = ordenarOpcoes(filter.options || []).filter(
                        (option: string) => {
                          return option
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase());
                        }
                      );

                      return (
                        <div key={filter.label} className="relative">
                          <label className="mb-1 block text-xs font-bold uppercase text-slate-500 dark:text-slate-300">
                            {filter.label}
                          </label>

                          <button
                            type="button"
                            onClick={() => toggleDropdown(filter.label)}
                            className="flex w-full items-center justify-between rounded-md border px-3 py-2 text-left text-sm text-slate-600 dark:border-gray-600 dark:bg-[#182e46] dark:text-gray-300"
                          >
                            <span>{getResumoFiltro(filter)}</span>
                            <ChevronIcon up={dropdowns[filter.label]} />
                          </button>

                          {dropdowns[filter.label] && (
                            <div className="absolute left-0 top-[68px] z-[999] max-h-72 w-full overflow-y-auto rounded-md border bg-white p-3 shadow-lg dark:border-gray-600 dark:bg-[#152638]">
                              <input
                                value={searchTerm}
                                onChange={(event) =>
                                  handleSearchChange(
                                    filter.label,
                                    event.target.value
                                  )
                                }
                                placeholder="Pesquisar..."
                                className="mb-2 w-full rounded border px-2 py-1 text-sm dark:border-gray-600 dark:bg-[#152638] dark:text-gray-300"
                              />

                              {filter.allowMultiple !== false && (
                                <button
                                  type="button"
                                  onClick={() => handleSelectAll(filter.label)}
                                  className="mb-2 block w-max text-sm font-medium text-blue-600 hover:underline"
                                >
                                  {filter.selected.length ===
                                  filter.options.length
                                    ? "Desselecionar Todos"
                                    : "Selecionar Todos"}
                                </button>
                              )}

                              <div className="space-y-2">
                                {options.map((option: string) => (
                                  <label
                                    key={`${filter.label}-${option}`}
                                    className="flex cursor-pointer items-center gap-2 text-sm text-slate-700 dark:text-slate-300"
                                  >
                                    <input
                                      type="checkbox"
                                      checked={filter.selected.includes(option)}
                                      onChange={() =>
                                        handleCheckboxChange(
                                          filter.label,
                                          option
                                        )
                                      }
                                      className="h-4 w-4 text-blue-600"
                                    />

                                    <span>
                                      {filter.hash
                                        ? filter.hash[`${option}`] ?? option
                                        : option}
                                    </span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    }
                  )}
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={onResetFilters}
                    className="rounded-md bg-gray-100 px-5 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200"
                  >
                    Limpar Filtros
                  </button>

                  <button
                    type="button"
                    onClick={onApplyFilters}
                    className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Confirmar Filtros
                  </button>
                </div>
              </div>
            </FocusHidden>
          )}
        </div>
      )}

      {!navVisible && (
        <button
          type="button"
          onClick={() => setNavVisible(true)}
          className="fixed right-8 top-0 z-50 rounded-b-md bg-gray-200 px-5 py-3 text-sm font-medium text-gray-700 shadow"
        >
          Abrir Filtros ↓
        </button>
      )}

      {navVisible && (
        <button
          type="button"
          onClick={() => setNavVisible(false)}
          className="fixed right-8 top-[170px] z-50 rounded-b-md bg-gray-200 px-5 py-3 text-sm font-medium text-gray-700 shadow"
        >
          Fechar Filtros ↑
        </button>
      )}
    </>
  );
}
