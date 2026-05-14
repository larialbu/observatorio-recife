const fs = require("fs");
const path = require("path");

/**
 * Gera automaticamente:
 * src/utils/filters/combustiveis/combustiveisFilters.ts
 *
 * Lendo:
 * src/data/observatorio/combustiveis/combustiveis.json
 *
 * Como rodar:
 * node scripts/gerar-filtro-combustiveis.js
 */

const DATA_PATH = path.join(
  process.cwd(),
  "src",
  "data",
  "observatorio",
  "combustiveis",
  "combustiveis.json"
);

const OUTPUT_PATH = path.join(
  process.cwd(),
  "src",
  "utils",
  "filters",
  "combustiveis",
  "combustiveisFilters.ts"
);

const MONTH_OPTIONS = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

const MONTHS_FILTER = `  months: [
    {
      label: "MÊS",
      options: [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
      ],
      selected: [],
      hash: "months",
      allowMultiple: true,
    },
  ],`;

function normalizeValue(value) {
  return String(value ?? "").trim();
}

function normalizeKey(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();
}

function safeText(value) {
  return String(value ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"');
}

function getField(row, possibleNames) {
  for (const name of possibleNames) {
    const value = row?.[name];

    if (value !== undefined && value !== null && String(value).trim() !== "") {
      return value;
    }
  }

  return "";
}

function uniqueSorted(values) {
  return Array.from(new Set(values.map(normalizeValue)))
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b, "pt-BR", { sensitivity: "base" }));
}

function uniqueYears(values) {
  return Array.from(new Set(values.map(normalizeValue)))
    .filter(Boolean)
    .sort((a, b) => Number(a) - Number(b));
}

function normalizeRegion(value) {
  const original = normalizeValue(value);
  const key = normalizeKey(original);

  const map = {
    NORTE: "Norte",
    NORDESTE: "Nordeste",
    "CENTRO OESTE": "Centro-Oeste",
    "CENTRO-OESTE": "Centro-Oeste",
    SUDESTE: "Sudeste",
    SUL: "Sul",
  };

  return map[key] || original;
}

function removeUfFromMunicipio(value) {
  return normalizeValue(value).replace(/\s-\s[A-Z]{2}$/i, "");
}

function readData() {
  if (!fs.existsSync(DATA_PATH)) {
    throw new Error(`Arquivo de dados não encontrado: ${DATA_PATH}`);
  }

  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  const json = JSON.parse(raw);

  if (Array.isArray(json)) {
    return json;
  }

  if (Array.isArray(json.data)) {
    return json.data;
  }

  throw new Error(
    "Formato inválido. O JSON precisa ser um array ou ter uma propriedade data."
  );
}

function toTsArray(values, indent = "        ") {
  if (!values.length) return "";

  return values.map((value) => `${indent}"${safeText(value)}"`).join(",\n");
}

function buildFilterBlock({ label, options, selected, allowMultiple = false }) {
  return `    {
      label: "${label}",
      options: [
${toTsArray(options)}
      ],
      selected: ${selected ? `["${safeText(selected)}"]` : "[]"},
      allowMultiple: ${allowMultiple ? "true" : "false"},
    }`;
}

function main() {
  const data = readData();

  const years = uniqueYears(
    data.map((row) => getField(row, ["ano", "ANO", "year", "YEAR"]))
  );

  const produtos = uniqueSorted(
    data.map((row) => getField(row, ["produto", "PRODUTO", "Produto"]))
  );

  const regioes = uniqueSorted(
    data.map((row) =>
      normalizeRegion(
        getField(row, ["regiao", "REGIAO", "REGIÃO", "Regiao", "Região"])
      )
    )
  );

  const estados = uniqueSorted(
    data.map((row) => getField(row, ["estado", "ESTADO", "uf", "UF"]))
  );

  const municipios = uniqueSorted(
    data.map((row) =>
      removeUfFromMunicipio(
        getField(row, [
          "municipio",
          "MUNICIPIO",
          "MUNICÍPIO",
          "Municipio",
          "Município",
        ])
      )
    )
  );

  const defaultYear = years.includes("2024")
    ? "2024"
    : years[years.length - 1] || "2024";

  const defaultProduto = produtos.includes("Gasolina Comum")
    ? "Gasolina Comum"
    : produtos[0] || "";

  const defaultEstado = "Todos";

  const defaultMunicipio = "Todos";

  const content = `import { Filters } from "@/@types/observatorio/shared";

/**
 * Arquivo gerado automaticamente por:
 * scripts/gerar-filtro-combustiveis.js
 *
 * Não edite as opções manualmente.
 * Sempre que atualizar o combustiveis.json, rode:
 * node scripts/gerar-filtro-combustiveis.js
 */

export const combustiveisFilters: Filters = {
  years: [
${toTsArray(years, "    ")}
  ],

${MONTHS_FILTER}

  additionalFilters: [
${buildFilterBlock({
  label: "MÊS",
  options: MONTH_OPTIONS,
  selected: "",
  allowMultiple: true,
})},
${buildFilterBlock({
  label: "PRODUTO",
  options: produtos,
  selected: defaultProduto,
})},
${buildFilterBlock({
  label: "REGIÃO",
  options: ["Todos", ...regioes],
  selected: "",
})},
${buildFilterBlock({
  label: "ESTADO",
  options: ["Todos", ...estados],
  selected: defaultEstado,
})},
${buildFilterBlock({
  label: "MUNICÍPIO",
  options: ["Todos", ...municipios],
  selected: defaultMunicipio,
})},
  ],
};
`;

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, content, "utf-8");

  console.log("✅ Filtro de combustíveis gerado com sucesso!");
  console.log(`Arquivo: ${OUTPUT_PATH}`);
  console.log(`Anos: ${years.length}`);
  console.log(`Produtos: ${produtos.length}`);
  console.log(`Regiões: ${regioes.length}`);
  console.log(`Estados: ${estados.length}`);
  console.log(`Municípios: ${municipios.length}`);
  console.log("Filtro MÊS adicionado em additionalFilters.");
  console.log("");
  console.log("Defaults usados:");
  console.log(`Ano: ${defaultYear}`);
  console.log(`Produto: ${defaultProduto}`);
  console.log(`Estado: ${defaultEstado}`);
  console.log(`Município: ${defaultMunicipio}`);
}

try {
  main();
} catch (error) {
  console.error("❌ Erro ao gerar filtro de combustíveis:");
  console.error(error.message);
  process.exit(1);
}
