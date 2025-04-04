export const truncateTextFormatter = (descricao: string, maxLength: number) => {
    return descricao.length > maxLength
      ? descricao.substring(0, maxLength) + "..."
      : descricao;
  };