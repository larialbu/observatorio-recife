export const saveExcalidrawBuffer = async (
  buffer: ArrayBuffer
): Promise<void> => {
  try {
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64String = btoa(binary);
    localStorage.setItem("excalidrawBuffer", base64String);
  } catch (error) {
    console.error("Error saving excalidraw buffer:", error);
  }
};

export const loadExcalidrawBuffer = async (): Promise<{
  elements: any;
  appState: any;
  files: any;
} | null> => {
  try {
    const base64String = localStorage.getItem("excalidrawBuffer");
    if (!base64String) return null;
    const binary = atob(base64String);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const jsonString = new TextDecoder().decode(bytes);
    const data = JSON.parse(jsonString);
    return data;
  } catch (error) {
    console.error("Error loading excalidraw buffer:", error);
    return null;
  }
};
