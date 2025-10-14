export function formatarData(data: Date) {
    const [ ano, mes, dia ] = [data.getFullYear(), data.getMonth() + 1, data.getDate()]
    const m = String(mes).padStart(2, '0')
    const d = String(dia).padStart(2, '0')

    return `${d}-${m}-${ano}`
}