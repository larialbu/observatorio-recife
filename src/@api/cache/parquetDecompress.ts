import { createExtractorFromData } from "node-unrar-js";
import { saveToIndexedDB } from "./indexDB";
import { saveVersion, getVersion } from "./versionUtils";
import { setProgress, setMessage, enableFirst, disableFirst } from "@/utils/loader/progressEmitter";

const DB_NAME = "parquetDB";
const STORE_NAME = "parquetFiles";
const MANIFEST_URL = "/manifest.json";

// Função para limpar o caminho do arquivo
function cleanFilePath(filePath: string) {
  let cleanedKey = filePath.replace(/^bundles\//, "");
  let parts = cleanedKey.split("/");
  let fileName = parts[parts.length - 1].replace(/\.parquet$/, "");
  if (/^\d+$/.test(fileName)) {
    parts[parts.length - 1] = fileName;
  } else {
    parts.pop();
  }
  return "/" + parts.join("/");
}

/**
 * Processa um bundle:
 * 1. Faz o download do bundle (.rar).
 * 2. Realiza a extração (simulando 30% do progresso).
 * 3. Salva os arquivos extraídos no IndexedDB (70% do progresso).
 * Durante cada etapa, atualiza o progresso e a mensagem com logs do tipo:
 * "aeroportos -> extração 40%"
 */
async function processBundle(bundleKey: string, filename: string, version: number, setLoadingStatus?: (status: any) => void) {
  const updateCategoryStatus = (stage: string, percent: number) => {
    const msg = `${bundleKey} -> ${stage} ${percent.toFixed(0)}%`;
    setMessage(msg);
    console.log(msg);

    if (setLoadingStatus) {
      setLoadingStatus((prev: any) => ({
        ...prev,
        [bundleKey]: { stage, percent: Math.round(percent) },
      }));
    }
  };

  const bundleUrl = `/${filename}`;
  const bundleArrayBuffer = await fetchWithProgress(bundleUrl, (percent) => {
    updateCategoryStatus("download", percent);
  });

  const wasmResponse = await fetch('/unrar.wasm');
  const wasmArrayBuffer = await wasmResponse.arrayBuffer();
  const extractor = await createExtractorFromData({ wasmBinary: wasmArrayBuffer, data: bundleArrayBuffer });
  const extracted = extractor.extract();

  const filesArray = [];
  for (const file of extracted.files) {
    filesArray.push(file);
  }

  let processed = 0;
  let total = filesArray.length;

  let extractedCount = 0;
  const totalFiles = filesArray.length;
  for (const file of filesArray) {
    extractedCount++;
    const percent = (extractedCount / totalFiles) * 30;
    updateCategoryStatus("extração", percent);
  }
  updateCategoryStatus("extração", 100);

  let savedCount = 0;
  for (const file of filesArray) {
    const { fileHeader, extraction } = file;
    const cleanedKey = cleanFilePath(fileHeader.name);
    await saveToIndexedDB(DB_NAME, STORE_NAME, cleanedKey, extraction?.buffer);
    savedCount++;
    const percent = 30 + (savedCount / totalFiles) * 70;
    updateCategoryStatus("salvando", percent);
  }
  updateCategoryStatus("completo", 100);

  await saveVersion(bundleKey, version);
  console.log(`🔄 ${bundleKey} atualizado para versão ${version}`);
}


/**
 * Carrega e sincroniza todos os bundles listados no manifest.
 * Para cada bundle, verifica se a versão local (IndexedDB) está desatualizada;
 * se sim, chama processBundle para atualizar.
 */
export async function loadAndSyncBundles() {
  enableFirst();
  setProgress(5);
  setMessage("Verificando dados...");

  const response = await fetch(MANIFEST_URL, { cache: "no-store" });
  const manifest = await response.json();

  for (const [bundleKey, bundleInfo] of Object.entries(manifest) as any) {
    const filename = bundleInfo.filename;
    const version = bundleInfo.version;

    const currentVersion = await getVersion(bundleKey);

    if (currentVersion === null || version > currentVersion) {
      console.log(`🆕 Atualizando ${bundleKey} da versão ${currentVersion || "inexistente"} → ${version}`);
      await processBundle(bundleKey, filename, version);
    } else {
      console.log(`✔️ ${bundleKey} já está atualizado (v${version})`);
    }
  }

  setProgress(100);
  setMessage("Todos os bundles verificados e atualizados.");
  disableFirst();
}


async function fetchWithProgress(url: string, onProgress: (percent: number) => void): Promise<ArrayBuffer> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Erro ao baixar ${url}: ${response.statusText}`);

  const contentLengthHeader = response.headers.get("Content-Length");
  const total = contentLengthHeader ? parseInt(contentLengthHeader, 10) : 0;
  const reader = response.body?.getReader();
  if (!reader || total === 0) {

    const arrayBuffer = await response.arrayBuffer();
    onProgress(100);
    return arrayBuffer;
  }

  let receivedLength = 0;
  const chunks: Uint8Array[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) {
      chunks.push(value);
      receivedLength += value.length;
      const percent = total ? (receivedLength / total) * 100 : 100;
      onProgress(percent);
    }
  }

  const chunksAll = new Uint8Array(receivedLength);
  let position = 0;
  for (const chunk of chunks) {
    chunksAll.set(chunk, position);
    position += chunk.length;
  }
  return chunksAll.buffer;
}
