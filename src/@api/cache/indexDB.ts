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

  export async function checkSaves(dbName: string, storeName: string, key: string): Promise<boolean> {
    try {
      const result = await getFromIndexedDB(dbName, storeName, key);
      if (result && (result.version === undefined || result.version < 2)) {
        console.log("Atualizando ou inserindo bundle...");
        return false;
      }
  
      return result !== undefined && result !== null;
    } catch (error) {
      console.error("Erro ao verificar a existência do item no IndexedDB:", error);
      return false; 
    }
  }