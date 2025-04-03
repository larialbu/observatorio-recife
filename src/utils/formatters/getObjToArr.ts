export function getObjToArr<T>(data: Record<string, T>): { label: string; value: T }[] {
    return Object.entries(data).map(([label, value]) => ({ label, value }));
  }