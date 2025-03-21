import { createExtractorFromData } from "node-unrar-js";
import { saveToIndexedDB, getFromIndexedDB } from "./indexDB";
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

async function processBundle(bundleKey: string, filename: string, version: number) {
  const response = await fetch(`/${filename}`);
  const bundleArrayBuffer = await response.arrayBuffer();

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

    for (const file of filesArray) {
      const { fileHeader, extraction } = file;

      if (fileHeader.flags.directory) {
        continue;
      }

      if (!extraction) {
        console.warn(`Sem conteúdo extraído: ${fileHeader.name}`);
        continue;
      }

      const cleanedKey = cleanFilePath(fileHeader.name);
      console.log(`Salvando: ${cleanedKey}`);
      await saveToIndexedDB(DB_NAME, STORE_NAME, cleanedKey, extraction.buffer);

      processed++;
      const progress = 70 + (processed / total) * 65;
      setProgress(progress);
      setMessage(`Salvando ${cleanedKey} (${processed}/${total})`);
    }

  await saveVersion(bundleKey, version);
  console.log(`🔄 ${bundleKey} atualizado para versão ${version}`);
}

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
      console.log(`🆕 Atualizando ${bundleKey} da versão ${currentVersion} → ${version}`);
      await processBundle(bundleKey, filename, version);
    } else {
      console.log(`✔️ ${bundleKey} já está atualizado (v${version})`);
    }
  }

  setProgress(100);
  setMessage("Todos os bundles verificados e atualizados.");
  disableFirst();
}
