import { unzipSync } from "fflate"; // Importando o método de descompactação
import { saveToIndexedDB } from "./indexDB";

const DB_NAME = "parquetDB";
const STORE_NAME = "parquetFiles";

// Função para limpar o caminho do arquivo
function cleanFilePath(filePath: string) {
  // Remover o prefixo "dados/"
  let cleanedKey = filePath.replace(/^dados\//, "");

  // Dividir o caminho em partes (diretórios e nome do arquivo)
  let parts = cleanedKey.split("/");

  // Verificar se o último segmento (nome do arquivo sem extensão) é numérico
  let fileName = parts[parts.length - 1].replace(/\.parquet$/, ""); // Remover ".parquet"
  if (/^\d+$/.test(fileName)) {
    // Se for numérico, manter o nome do arquivo no caminho
    parts[parts.length - 1] = fileName;
  } else {
    // Se não for numérico, remover o nome do arquivo
    parts.pop();
  }

  // Reconstruir o caminho com "/"
  return "/" + parts.join("/");
}

// Função para carregar arquivos Parquet de um ZIP
export async function loadParquetFilesFromZip(zipArrayBuffer: ArrayBuffer) {
  try {
    const zipContent = unzipSync(new Uint8Array(zipArrayBuffer)); // Descompactando o arquivo zip

    for (const fileName in zipContent) {
      const fileBuffer = zipContent[fileName];

      if (fileName.endsWith(".parquet")) {
        try {
          console.log(`Lendo o arquivo Parquet: ${fileName}`);

          // Limpar o caminho do arquivo
          const cleanedKey = cleanFilePath(fileName);

          // Salvar no IndexedDB
          await saveToIndexedDB(DB_NAME, STORE_NAME, cleanedKey, fileBuffer);
          console.log(`Arquivo salvo no IndexedDB: ${cleanedKey}`);
        } catch (error) {
          console.error(`Erro ao processar o arquivo ${fileName}:`, error);
        }
      }
    }
  } catch (error) {
    console.error("Erro ao descompactar o arquivo ZIP:", error);
  }
}

// Função principal para carregar o bundle
export async function loadParquetBundle() {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
  const API_USERNAME = process.env.NEXT_PUBLIC_API_USERNAME!;
  const API_PASSWORD = process.env.NEXT_PUBLIC_API_PASSWORD!;

  try {
    const response = await fetch(`${BASE_URL}/bundle/full`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${btoa(`${API_USERNAME}:${API_PASSWORD}`)}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar o arquivo: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    await loadParquetFilesFromZip(arrayBuffer);
  } catch (error) {
    console.error("Erro ao carregar e processar o bundle:", error);
  }
}
