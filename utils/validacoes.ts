export function dataValidation(dia: string, mes: string) {
    if (parseInt(mes) > 12 || parseInt(dia) > 31 || dia === undefined || mes === undefined) {
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