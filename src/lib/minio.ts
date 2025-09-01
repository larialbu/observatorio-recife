const MINIO_ENDPOINT = process.env.MINIO_ENDPOINT!;
const MINIO_ACCESS_KEY = process.env.MINIO_ACCESS_KEY!;
const MINIO_SECRET_KEY = process.env.MINIO_SECRET_KEY!;
const MINIO_REPOSITORY = process.env.MINIO_REPOSITORY!;

export interface MinIOConfig {
  endpoint: string;
  accessKey: string;
  secretKey: string;
  repository: string;
}

export const minioConfig: MinIOConfig = {
  endpoint: MINIO_ENDPOINT,
  accessKey: MINIO_ACCESS_KEY,
  secretKey: MINIO_SECRET_KEY,
  repository: MINIO_REPOSITORY,
};

export function getMinIOHeaders(): Record<string, string> {
  return {
    'chave-acesso': minioConfig.accessKey,
    'senha-secreta': minioConfig.secretKey,
    'repositorio': minioConfig.repository,
  };
}

export function toBase64(str: string): string {
  return Buffer.from(str, 'utf-8').toString('base64');
}

export function fromBase64(str: string): string {
  return Buffer.from(str, 'base64').toString('utf-8');
}

export async function listMinIOFiles(directory = '*'): Promise<string[]> {
  try {
    const directoryBase64 = toBase64(directory);
    const response = await fetch(`${minioConfig.endpoint}/v2/list/${directoryBase64}`, {
      method: 'GET',
      headers: getMinIOHeaders(),
    });

    if (response.ok) {
      const data = await response.text();
      if (data && data.trim()) {
        try {
          return JSON.parse(data);
        } catch {
          return data.split('\n').filter(line => line.trim());
        }
      }
    } else if (response.status === 204) {
      return [];
    } else {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.mensagem || `Erro ${response.status}`);
    }
  } catch (error) {
    console.error('Erro ao listar arquivos MinIO:', error);
    throw error;
  }
  
  return [];
}

export async function downloadMinIOFile(fileName: string): Promise<ArrayBuffer> {
  try {
    const fileNameBase64 = toBase64(fileName);
    const response = await fetch(`${minioConfig.endpoint}/v2/download/${fileNameBase64}`, {
      method: 'GET',
      headers: getMinIOHeaders(),
    });

    if (response.ok) {
      return await response.arrayBuffer();
    } else {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.mensagem || `Erro ${response.status}`);
    }
  } catch (error) {
    console.error(`Erro ao baixar arquivo ${fileName}:`, error);
    throw error;
  }
}

export async function fileExistsInMinIO(fileName: string): Promise<boolean> {
  try {
    const files = await listMinIOFiles();
    return files.includes(fileName);
  } catch {
    return false;
  }
}