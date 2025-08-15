export function dataValidation(dia: string, mes: string, ano: string = '2025') {
    const anoQueEstamos = new Date().getFullYear()

    if (parseInt(mes) > 12 || parseInt(dia) > 31 || parseInt(ano) > anoQueEstamos || ano.length < 2 || ano.length === 3 || dia === undefined || mes === undefined) {
        alert('Data inválida')
        return false
    }
    return true
}

export function nomeValidation(nome: string) {
    if (nome === undefined || nome === '') {
        alert('Nome inválido')
        return false
    }
    return true
}

export function valorValidation(value: string) {
    if (value === undefined || value === '' || Number(value) <= 0) {
        alert('Valor inválido')
        return false
    }
    return true
}