export const processPassageirosTotalizados = (data: any) => {
    return data.reduce((acc: number, mov: any) => { 
        // Acessa o valor de Passageiros e soma com o acumulador
        return acc + mov['Passageiros'];
    }, 0);
}