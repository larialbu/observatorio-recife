import fs from "fs";
import path from "path";

import { AnpCombustiveisHeaders } from "@/@types/observatorio/@fetch/combustiveis";

let cache: AnpCombustiveisHeaders[] | null = null;

export async function readCombustiveisData() {
  if (cache) return cache;

  const filePath = path.join(
    process.cwd(),
    "src",
    "data",
    "observatorio",
    "combustiveis",
    "combustiveis.json"
  );

  if (!fs.existsSync(filePath)) {
    throw new Error(`Arquivo combustiveis.json não encontrado em: ${filePath}`);
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const rows = JSON.parse(fileContent) as AnpCombustiveisHeaders[];

  cache = rows;

  return rows;
}