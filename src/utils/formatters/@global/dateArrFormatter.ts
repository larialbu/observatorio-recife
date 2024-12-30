// janeiro
// fevereiro
// março
// abril
// maio
// junho
// julho
// agosto
// setembro
// outubro 
// novembro 
// dezembro

export const monthFormatter = (date: number) => {
    switch (date) {
        case 12:
            return 'Dezembro'

        case 11:
            return 'Novembro'

        case 10:
            return 'Outubro'

        case 9:
            return 'Setembro'

        case 8:
            return 'Agosto'

        case 7:
            return 'Julho'

        case 6:
            return 'Junho'

        case 5:
            return 'Maio'

        case 4:
            return 'Abril'

        case 3:
            return 'Março'

        case 2:
            return 'Fevereiro'

        case 1:
            return 'Janeiro'

        default: 'Anual'

    }
}

export const dateArrFormatter = (date: [number, number] | [number] | []) => {
    if (date.length === 0) {
        return 'anual'
    } else if (date.length === 1) {
        return monthFormatter(date[0])
    } else if (date.length === 2) {
        return `${monthFormatter(date[0])} - ${monthFormatter(date[1])}`
    } else {
        return 'inválido'
    }

}