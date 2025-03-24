import { parquetRead } from "hyparquet";
import { compressors } from "hyparquet-compressors";

// Função para ler o arquivo Parquet a partir de um ArrayBuffer
export async function readParquetFromBuffer<T>(buffer: ArrayBuffer): Promise<T> {
  return new Promise<any>((resolve, reject) => {
    parquetRead({
      file: buffer,
      rowFormat: "object",
      compressors,
      onComplete: (parsedData) => resolve(parsedData),
    });
  });
}