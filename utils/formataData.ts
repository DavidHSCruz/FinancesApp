export function formatarData(data: Date) {
    const [ ano, mes, dia ] = [data.getFullYear(), data.getMonth() + 1, data.getDate()]
    const m = String(mes).padStart(2, '0')
    const d = String(dia).padStart(2, '0')

    return `${d}-${m}-${ano}`
}

export function formatarDataBR(data: Date) {
    const [ ano, mes, dia ] = [data.getFullYear(), data.getMonth() + 1, data.getDate()]
    const m = String(mes).padStart(2, '0')
    const d = String(dia).padStart(2, '0')

    return `${d}/${m}/${ano}`
}

export function getDiaMesAno(data: string) {
    const [ dia, mes, ano ] = data.split('-').map(Number)
    return { dia, mes, ano }
}

export function formatInputDataDiaMesAno(value: string) {
  const onlyNums = value.replace(/\D/g, "")
  const limited = onlyNums.slice(0, 8)

  if (limited.length <= 2) {
    return limited
  } else if (limited.length <= 4) {
    return limited.slice(0, 2) + "/" + limited.slice(2)
  } else {
    return (
      limited.slice(0, 2) + "/" + limited.slice(2, 4) + "/" + limited.slice(4)
    )
  }
}

export function formatInputDataMesAno(value: string) {
  const onlyNums = value.replace(/\D/g, "")
  const limited = onlyNums.slice(0, 6)

  if (limited.length <= 2) {
    return limited
  } else {
    return (
      limited.slice(0, 2) + "/" + limited.slice(2)
    )
  }
}
