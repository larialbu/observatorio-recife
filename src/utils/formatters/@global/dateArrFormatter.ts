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

const monthFormatter = (date: number) => {
    switch (date) {
        case 12:
            return 'dezembro'

        case 11:
            return 'novembro'

        case 10:
            return 'outubro'

        case 9:
            return 'setembro'

        case 8:
            return 'agosto'

        case 7:
            return 'julho'

        case 6:
            return 'junho'

        case 5:
            return 'maio'

        case 4:
            return 'abril'

        case 3:
            return 'março'

        case 2:
            return 'fevereiro'

        case 1:
            return 'janeiro'

        default: 'anual'

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