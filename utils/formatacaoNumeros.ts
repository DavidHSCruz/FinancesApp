export function valorFormatadoBR(value: number) {
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
}

export function valorFormatadoDB(value: string) {
    return Number(
        value
            .replace(/R\$\s*/g, '')
            .replace(/\./g, '')
            .replace(',', '.'))
            .toFixed(2)
}

export function formatInputCurrencyBRL(value: string) {
    const onlyNums = value.replace(/\D/g, '')
    if (onlyNums === "") return "R$ 0,00"

    if (onlyNums.length === 1) return "R$ 0,0" + onlyNums
    if (onlyNums.length === 2) return "R$ 0," + onlyNums

    let intPart = Number(onlyNums.slice(0, -2)).toString()
    const decimalPart = onlyNums.slice(-2)

    intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".")

    return "R$ " + intPart + "," + decimalPart
}

export function formatCurrencyBRLToNumber(value: string) {
    return Number(
        value
            .replace(/R\$\s*/g, '')
            .replace('.', '')
            .replace(',', '.')
    )
}