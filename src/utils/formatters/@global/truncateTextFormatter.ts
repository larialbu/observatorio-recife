export const truncateTextFormatter = (descricao: string, maxLength: number) => {
  const descricaoFormatada = descricao.toLowerCase();
  const descricaoComPrimeiraMaiuscula = descricaoFormatada.charAt(0).toUpperCase() + descricaoFormatada.slice(1);

  return descricaoComPrimeiraMaiuscula.length > maxLength
    ? descricaoComPrimeiraMaiuscula.substring(0, maxLength) + "..."
    : descricaoComPrimeiraMaiuscula;
};
