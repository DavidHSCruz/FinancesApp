export function valorFormatadoBR(value: number) {
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
}

export  function valorFormatadoDB(value: string) {
    return Number(value.replace(/\./g, '').replace(',', '.')).toFixed(2)
}