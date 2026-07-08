const API_LOGIN_URL = `${process.env.NEXT_PUBLIC_API_BASE_LOGIN}/api/auth/login`;
const API_USERNAME = process.env.NEXT_PUBLIC_API_USERNAME!;
const API_PASSWORD = process.env.NEXT_PUBLIC_API_PASSWORD!;

function setAuthCookie(token: string): void {
  const expires = new Date();
  expires.setDate(expires.getDate() + 1); // Token válido por 1 dia
  document.cookie = `token=${token};expires=${expires.toUTCString()};path=/`;
}

export function getAuthToken(): string | null {
  const name = "token=";
  const cookie = document.cookie
    .split(';')
    .find(c => c.trim().startsWith(name));
  return cookie ? decodeURIComponent(cookie.trim().substring(name.length)) : null;
}

export async function performAutoLogin(): Promise<boolean> {
  const loginPayload = {
    username: API_USERNAME,
    password: API_PASSWORD,
  };

  console.log("Tentando login automático com o payload:", loginPayload);

  try {
    const response = await fetch(API_LOGIN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginPayload),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const errorMessage = responseData.message || `Status: ${response.status}`;
      console.error("Falha no login automático:", errorMessage);
      return false;
    }

    const token = responseData.token;

    if (token) {
      setAuthCookie(token);
      return true;
    } else {
      console.error("Token não encontrado na resposta da API de login.");
      return false;
    }
  } catch (error) {
    console.error("Erro crítico na comunicação durante o login automático:", error);
    return false;
  }
}