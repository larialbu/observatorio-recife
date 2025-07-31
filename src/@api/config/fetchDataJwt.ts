import { getAuthToken } from "./authService";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function fetchDataJwt<T>(
  endpoint: string,
  cache: Record<string, any>
): Promise<T> {
  if (cache[endpoint]) {
    return cache[endpoint];
  }

  const token = getAuthToken();

  if (!token) {
    throw new Error("Token de autenticação não encontrado.");
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    let errorMessage = `Erro na requisição para ${endpoint} (Status: ${response.status})`;
    try {
      const errorData = await response.json();
      if (errorData.message) {
        errorMessage = `${errorMessage}: ${errorData.message}`;
      }
    } catch (e) {}
    
    throw new Error(errorMessage);
  }

  const data = await response.json();
  cache[endpoint] = data;
  return data;
}