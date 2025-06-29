export const sameKeys = <T extends object, U extends object>(obj1: T, obj2: U): boolean => {

    // Obtém as chaves de cada objeto
    const keys1 = Object.keys(obj1) as Array<keyof T>;
    const keys2 = Object.keys(obj2) as Array<keyof U>;

    // Verifica se os arrays têm o mesmo comprimento
    if (keys1.length !== keys2.length) {
        return false;
    }

    // Verifica se todas as chaves de obj1 estão presentes em obj2
    for (const key of keys1) {
        if (!keys2.includes(key as any)) {
            return false;
        }
    }

    return true;
  };
