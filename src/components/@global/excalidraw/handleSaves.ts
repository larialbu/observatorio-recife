export const openDatabase = () => {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open("excalidrawDB", 1);
      request.onupgradeneeded = (event: any) => {
        const db = event.target!.result;
        if (!db.objectStoreNames.contains("excalidrawData")) {
          db.createObjectStore("excalidrawData", { keyPath: "id" });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  };
  
  export const saveExcalidrawBuffer = async (buffer: ArrayBuffer): Promise<void> => {
    try {
      const db = await openDatabase();
      const tx = db.transaction("excalidrawData", "readwrite");
      const store = tx.objectStore("excalidrawData");
      store.put({ id: 1, buffer });
  
      await new Promise((resolve, reject) => {
        tx.oncomplete = resolve;
        tx.onerror = () => reject(tx.error);
      });
      console.log("[Quadro] Cena salva");
    } catch (error) {
      console.error("Erro ao salvar:", error);
      throw error;
    }
  };
  
  export const loadExcalidrawBuffer = async (): Promise<{
    elements: any[];
    appState: any;
    files: Record<string, ArrayBuffer>;
  } | null> => {
    try {
      const db = await openDatabase();
      const result = await new Promise<any>((resolve, reject) => {
        const tx = db.transaction("excalidrawData", "readonly");
        const store = tx.objectStore("excalidrawData");
        const request = store.get(1);
        
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
  
      if (!result?.buffer) return null;
  
      const json = new TextDecoder().decode(result.buffer);
      return JSON.parse(json, (key, value) => {
        if (
          key === "files" &&
          typeof value === "object" &&
          !Array.isArray(value)
        ) {
          return Object.fromEntries(
            Object.entries(value).map(([id, file]: any) => {
              // Aqui mantemos o objeto inteiro com o dataURL intacto
              return [id, file];
            })
          );
        }
        return value;
      });
      
    } catch (error) {
      console.error("Erro ao carregar:", error);
      return null;
    }
  };