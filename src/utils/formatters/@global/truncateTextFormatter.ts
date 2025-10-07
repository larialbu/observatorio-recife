export const truncateTextFormatter = (descricao: string, maxLength: number) => {
  if (!descricao) return "";
  if (descricao.length === 2) return descricao.toUpperCase();

  // Normaliza e padroniza
  let descricaoFormatada = descricao
    .normalize("NFKC") // remove caracteres estranhos invisíveis
    .replace(/\u00A0/g, " ") // converte espaços não separáveis em comuns
    .toLowerCase()
    .trim();

  // Primeira letra maiúscula
  descricaoFormatada =
    descricaoFormatada.charAt(0).toUpperCase() + descricaoFormatada.slice(1);

  // Trunca se exceder o limite
  if (descricaoFormatada.length > maxLength) {
    descricaoFormatada = descricaoFormatada.substring(0, maxLength) + "...";
  }

  // Força quebra de linha em vírgulas e espaços (inclusive NBSP)
  descricaoFormatada = descricaoFormatada
    .replace(/\s*,\s*/g, ",\n") // quebra após vírgulas
    .replace(/[\s\u00A0]+/g, "\n"); // quebra após qualquer tipo de espaço

  // Garante que não haja quebras duplas ou finais
  descricaoFormatada = descricaoFormatada.replace(/\n{2,}/g, "\n").replace(/\n+$/, "");

  return descricaoFormatada;
};
