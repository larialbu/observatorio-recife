export const setDataHeaders = <T, K extends keyof T>({
    data,
    header,
  }: {
    data: T[];
    header: Record<K, boolean>;
  }): Pick<T, K>[] => {
    return data.map(item => {
      // Filtrando as chaves de cada objeto com base no header
      const filteredItem = Object.keys(item as any).reduce((acc, key) => {
        const typedKey = key as K;
        if (header[typedKey]) {
          acc[typedKey] = item[typedKey];
        }
        return acc;
      }, {} as Pick<T, K>);
  
      return filteredItem;
    });
  };
