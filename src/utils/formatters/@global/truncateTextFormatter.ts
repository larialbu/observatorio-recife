export const truncateTextFormatter = (descricao: string, maxLength: number) => {
  if (descricao.length === 2) return descricao.toUpperCase()

  const descricaoFormatada = descricao.toLowerCase();
  const descricaoComPrimeiraMaiuscula = descricaoFormatada.charAt(0).toUpperCase() + descricaoFormatada.slice(1);

  return descricaoComPrimeiraMaiuscula.length > maxLength
    ? descricaoComPrimeiraMaiuscula.substring(0, maxLength) + "..."
    : descricaoComPrimeiraMaiuscula;
};
