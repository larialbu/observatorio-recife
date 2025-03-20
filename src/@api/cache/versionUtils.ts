import { saveToIndexedDB, getFromIndexedDB } from "./indexDB";

export async function saveVersion(bundleKey: string, version: number): Promise<void> {
  const versionKey = `__version__/${bundleKey}`;
  await saveToIndexedDB("parquetDB", "parquetFiles", versionKey, version);
}

export async function getVersion(bundleKey: string): Promise<number | null> {
  const versionKey = `__version__/${bundleKey}`;
  const result = await getFromIndexedDB("parquetDB", "parquetFiles", versionKey);
  return result ?? null;
}
