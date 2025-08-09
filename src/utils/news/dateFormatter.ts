export function formatarDataParaPtBR(dateString: string | null): string {
  if (!dateString || dateString === "Data não informada") {
    return "--";
  }

  const dateObject = new Date(dateString + 'T00:00:00');

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  return new Intl.DateTimeFormat('pt-BR', options).format(dateObject);
}