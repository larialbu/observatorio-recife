import { saveToIndexedDB, getFromIndexedDB, openDatabase } from "./indexDB";

export async function saveVersion(bundleKey: string, version: number): Promise<void> {
  const versionKey = `__version__/${bundleKey}`;
  await saveToIndexedDB("parquetDB", "parquetFiles", versionKey, version);
}

export async function getVersion(bundleKey: string): Promise<number | null> {
  const versionKey = `__version__/${bundleKey}`;
  const result = await getFromIndexedDB("parquetDB", "parquetFiles", versionKey);
  return result ?? null;
}

export async function getAllVersions(): Promise<Record<string, number>> {
  const db = await openDatabase("parquetDB", "parquetFiles");
  const tx = db.transaction("parquetFiles", "readonly");
  const store = tx.objectStore("parquetFiles");

  const allVersions: Record<string, number> = {};

  const request = store.openCursor();
  return new Promise((resolve, reject) => {
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const cursor = request.result;
      if (cursor) {
        const key = cursor.key as string;
        if (key.startsWith("__version__/")) {
          const bundleKey = key.replace("__version__/", "");
          allVersions[bundleKey] = cursor.value;
        }
        cursor.continue();
      } else {
        resolve(allVersions);
      }
    };
  });
}
