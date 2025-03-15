// import untar from "js-untar";
import { createExtractorFromData, UnrarError, createExtractorFromFile } from "node-unrar-js";
import { saveToIndexedDB } from "./indexDB";
import { arrayBuffer } from "stream/consumers";

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

    parts[parts.length - 1] = fileName;
  } else {

    parts.pop();
  }

  // Reconstruir o caminho com "/"
  return "/" + parts.join("/");
}
// 
// AQUI É PARA CASO VAR USAR UM TAR E PRECISE DE UMA SEGUNDA ETAPA
// 
//
// export async function loadParquetFilesFromTar(tarArrayBuffer: ArrayBuffer) {
//   try {
//     const tarContent = await untar(tarArrayBuffer); // Descompactando o arquivo .tar

//     for (const file of tarContent) {
//       console.log(file)
//       const fileName = file.name;

//       // Verifica o tipo do arquivo no TAR
//       if (!file.buffer) {  // "0" é para arquivos regulares
//         try {
//           console.log(`Lendo o arquivo Parquet: ${fileName}`);
//           const fileBuffer = file.buffer;

//           // Limpar o caminho do arquivo
//           const cleanedKey = cleanFilePath(fileName);

//           const arrayBuffer = fileBuffer.slice(fileBuffer.byteOffset, fileBuffer.byteOffset + fileBuffer.byteLength);

//           // Salvar no IndexedDB
//           await saveToIndexedDB(DB_NAME, STORE_NAME, cleanedKey, arrayBuffer);
//           console.log(`Arquivo salvo no IndexedDB: ${cleanedKey}`);
//         } catch (error) {
//           console.error(`Erro ao processar o arquivo ${fileName}:`, error);
//         }
//       } else if (file.type === "5") {
//         // Se for um diretório, apenas ignora
//         console.log(`Ignorando diretório: ${fileName}`);
//       }
//     }
//   } catch (error) {
//     console.error("Erro ao descompactar o arquivo TAR:", error);
//   }
// }


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

    const wasmResponse = await fetch('/unrar.wasm');
    const wasmArrayBuffer = await wasmResponse.arrayBuffer();

    const bundleArrayBuffer = await response.arrayBuffer();

    const extractor = await createExtractorFromData({ wasmBinary: wasmArrayBuffer, data: bundleArrayBuffer });

    const extracted = extractor.extract();

    for (const file of extracted.files) {
      const { fileHeader, extraction } = file;

      if (fileHeader.flags.directory) {
        continue;
      }

      if (!extraction) {
        console.warn(`Arquivo sem conteúdo extraído: ${fileHeader.name}`);
        continue;
      }

      const cleanedKey = cleanFilePath(fileHeader.name);

      await saveToIndexedDB(DB_NAME, STORE_NAME, cleanedKey, extraction.buffer);
      console.log(`Arquivo salvo no IndexedDB: ${cleanedKey}`);
    }

  } catch (error) {
    console.error("Erro ao carregar e processar o bundle:", error);
  }
}