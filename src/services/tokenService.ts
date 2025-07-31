export function saveToken(token: string): void {
  const expires = new Date();
  expires.setDate(expires.getDate() + 1);
  document.cookie = `token=${token};expires=${expires.toUTCString()};path=/`;
}

export function getToken(): string | null {
  const name = "token=";
  const cookie = document.cookie.split(';').find(c => c.trim().startsWith(name));
  return cookie ? decodeURIComponent(cookie.trim().substring(name.length)) : null;
}

export function clearToken(): void {
  document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
}