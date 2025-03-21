import { createExtractorFromData } from "node-unrar-js";
import { saveToIndexedDB } from "./indexDB";
import { saveVersion, getVersion } from "./versionUtils";
import { setProgress, setMessage, enableFirst, disableFirst } from "@/utils/loader/progressEmitter";

const DB_NAME = "parquetDB";
const STORE_NAME = "parquetFiles";
const MANIFEST_URL = "/manifest.json";

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

async function processBundle(
  bundleKey: string,
  filename: string,
  version: number,
  onProgress?: (progress: number) => void,
  setLoadingStatus?: (status: any) => void
) {
  const updateCategoryStatus = (stage: string, percent: number) => {
    const msg = `${bundleKey} -> ${stage} ${percent.toFixed(0)}%`;
    setMessage(msg);
    if (onProgress) onProgress(percent);
    
    if (setLoadingStatus) {
      setLoadingStatus((prev: any) => ({
        ...prev,
        [bundleKey]: { stage, percent: Math.round(percent) },
      }));
    }
  };

  try {
    const bundleUrl = `/${filename}`;
    const bundleArrayBuffer = await fetchWithProgress(bundleUrl, (percent) => {
      updateCategoryStatus("download", percent);
    });

    const wasmResponse = await fetch('/unrar.wasm');
    const wasmArrayBuffer = await wasmResponse.arrayBuffer();
    const extractor = await createExtractorFromData({ wasmBinary: wasmArrayBuffer, data: bundleArrayBuffer });
    const extracted = extractor.extract();

    const filesArray = Array.from(extracted.files);
    const totalFiles = filesArray.length;

    updateCategoryStatus("extração", 100);

    let savedCount = 0;
    for (const file of filesArray) {
      const { fileHeader, extraction } = file;
      const cleanedKey = cleanFilePath(fileHeader.name);
      await saveToIndexedDB(DB_NAME, STORE_NAME, cleanedKey, extraction?.buffer);
      savedCount++;
      updateCategoryStatus("salvando", 30 + (savedCount / totalFiles) * 70);
    }

    await saveVersion(bundleKey, version);
    updateCategoryStatus("completo", 100);

  } catch (error) {
    console.error(`Erro ao processar ${bundleKey}:`, error);
    throw error;
  }
}

export async function loadAndSyncBundles(
  onBundleProgress?: (bundleKey: string, progress: number) => void,
  onlyKeys?: string[]
) {
  enableFirst();
  setProgress(5);
  setMessage("Verificando dados...");

  const response = await fetch(MANIFEST_URL, { cache: "no-store" });
  const manifest = await response.json();

  const bundlesToUpdate = [];
  for (const [bundleKey, bundleInfo] of Object.entries(manifest) as any) {
    if (onlyKeys && !onlyKeys.includes(bundleKey)) continue;

    const currentVersion = await getVersion(bundleKey);
    if (currentVersion === null || bundleInfo.version > currentVersion) {
      bundlesToUpdate.push({ bundleKey, ...bundleInfo });
    }
  }

  const totalBundles = bundlesToUpdate.length;
  let completedBundles = 0;

  for (const bundle of bundlesToUpdate) {
    await processBundle(
      bundle.bundleKey,
      bundle.filename,
      bundle.version,
      (progress) => {
        const scaledProgress = (completedBundles * 100 + progress) / totalBundles;
        setProgress(scaledProgress);
        if (onBundleProgress) onBundleProgress(bundle.bundleKey, progress);
      }
    );
    completedBundles++;
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