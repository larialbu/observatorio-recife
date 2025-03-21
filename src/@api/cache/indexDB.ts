  export function openDatabase(dbName: string, storeName: string) {
      return new Promise<IDBDatabase>((resolve, reject) => {
        const request = indexedDB.open(dbName, 1);
    
        request.onupgradeneeded = (e) => {
          const db = (e.target as IDBOpenDBRequest).result;
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName);
          }
        };
    
        request.onerror = (e) => reject((e.target as IDBRequest).error);
        request.onsuccess = (e) => resolve((e.target as IDBRequest).result);
      });
    }
    
    export async function saveToIndexedDB(
      dbName: string,
      storeName: string,
      key: string,
      value: any
    ): Promise<void> {
      const db = await openDatabase(dbName, storeName);
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, "readwrite");
        const store = transaction.objectStore(storeName);
        store.put(value, key);
    
        transaction.oncomplete = () => resolve();
        transaction.onerror = (e) => reject((e.target as IDBRequest).error);
      });
    }

    export async function saveVersion(bundleKey: string, version: number): Promise<void> {
      const versionKey = `__version__/${bundleKey}`;
      await saveToIndexedDB("parquetDB", "parquetFiles", versionKey, version);
    }
    
    export async function getVersion(bundleKey: string): Promise<number | null> {
      const versionKey = `__version__/${bundleKey}`;
      const result = await getFromIndexedDB("parquetDB", "parquetFiles", versionKey);
      return result ?? null;
    }
    
    export async function getFromIndexedDB(
      dbName: string,
      storeName: string,
      key: string
    ): Promise<any> {
      const db = await openDatabase(dbName, storeName);
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, "readonly");
        const store = transaction.objectStore(storeName);
        const request = store.get(key);
    
        request.onsuccess = () => resolve(request.result);
        request.onerror = (e) => reject((e.target as IDBRequest).error);
      });
    }
    
    export async function listIndexedDBKeys(dbName: string, storeName: string): Promise<string[]> {
      const db = await openDatabase(dbName, storeName);
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, "readonly");
        const store = transaction.objectStore(storeName);
        const request = store.getAllKeys();
    
        request.onsuccess = () => resolve(request.result as string[]);
        request.onerror = (e) => reject((e.target as IDBRequest).error);
      });
    }

    ///////////////////////
    ////////////
    //////

    interface ManifestEntry {
      bundleKey: string;
      version: number;
    }

    export async function checkSaves(manifest: ManifestEntry[]): Promise<string[] | false> {
      const updatedBundles: string[] = [];
    
      for (const { bundleKey, version } of manifest) {
        try {
          const currentVersion = await getVersion(bundleKey);
          if (currentVersion === null || currentVersion < version) {
            updatedBundles.push(bundleKey);
          }
        } catch (error) {
          console.error(`Erro ao verificar a versão do bundle '${bundleKey}':`, error);
          updatedBundles.push(bundleKey); // assume que precisa atualizar se houve erro
        }
      }
    
      return updatedBundles.length > 0 ? updatedBundles : false;
    }