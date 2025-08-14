import { useEffect, useState } from "react"
import { Pressable, Text, View } from "react-native"
import { styles } from "./styles"

interface IIntervalo {
    nome: string,
    dataInicial: Date
    dataFinal: Date
}

function formataDataBR(data: Date) {
    return data.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })
}

function formataPeriodoTexto(dataInicial: Date, dataFinal: Date) {
    if (dataInicial.toString() === dataFinal.toString()) return formataDataBR(dataInicial)
    return `${formataDataBR(dataInicial)} - ${formataDataBR(dataFinal)}`
}

const Filtro = ({intervalo: i, difDias}: {intervalo: IIntervalo, difDias: number}) => {
    const [intervalo, setIntervalo] = useState(i)
    useEffect(() => {
        setIntervalo(i)
    }, [i])

    let dias = 0, mes = 0, ano = 0
    if (difDias > 0 && difDias < 10) dias = difDias
    if (difDias >= 10 && difDias < 40) mes = 1
    if (difDias >= 40) ano = 1

    return(
        <View style={styles.container}>
            <Pressable 
                onPress={() => 
                    setIntervalo({
                        ...intervalo, 
                        dataInicial: new Date(intervalo.dataInicial.getFullYear() - ano, intervalo.dataInicial.getMonth() - mes, intervalo.dataInicial.getDate() - dias), 
                        dataFinal: new Date(intervalo.dataFinal.getFullYear() - ano, intervalo.dataFinal.getMonth() - mes, intervalo.dataFinal.getDate() - dias)
                    })
                }
            ><Text style={[styles.text, {paddingVertical: 5, paddingHorizontal: 10}]}>{'<'}</Text>
            </Pressable>
            <Text style={styles.text}>{formataPeriodoTexto(intervalo.dataInicial, intervalo.dataFinal)}</Text>
            <Pressable 
                onPress={() => 
                    setIntervalo({
                        ...intervalo, 
                        dataInicial: new Date(intervalo.dataInicial.getFullYear() + ano, intervalo.dataInicial.getMonth() + mes, intervalo.dataInicial.getDate() + dias), 
                        dataFinal: new Date(intervalo.dataFinal.getFullYear() + ano, intervalo.dataFinal.getMonth() + mes, intervalo.dataFinal.getDate() + dias)
                    })
                }
            ><Text style={[styles.text, {paddingVertical: 5, paddingHorizontal: 10}]}>{'>'}</Text>
            </Pressable>
        </View>
    )
}

const Periodo = ({intervalo: i}: {intervalo: IIntervalo}) => {

    //FAZER INPUT TEXT PARA ALTERAR O PERIODO

    const [intervalo, setIntervalo] = useState(i)
    return(
        <View style={styles.container}>
            <Text style={{paddingVertical: 5, paddingHorizontal: 10}}></Text>
            <Text style={styles.text}>{formataPeriodoTexto(intervalo.dataInicial, intervalo.dataFinal)}</Text>
            <Text style={{paddingVertical: 5, paddingHorizontal: 10}}></Text>
        </View>
    )
}

function calculaDiferencaDias(dataInicial: Date, dataFinal: Date) {
    const dataInicialUTC = new Date(dataInicial.getTime() + dataInicial.getTimezoneOffset() * 60000)
    const dataFinalUTC = new Date(dataFinal.getTime() + dataFinal.getTimezoneOffset() * 60000)
    const diferencaEmMilissegundos = dataFinalUTC.getTime() - dataInicialUTC.getTime()
    let diferencaEmDias = diferencaEmMilissegundos / (1000 * 60 * 60 * 24)
    if (diferencaEmDias === 0) diferencaEmDias = 1
    return diferencaEmDias
}

export const FiltroSelected = ({intervalo} : {intervalo: IIntervalo}) => {
    const diferencaDeDias = calculaDiferencaDias(intervalo.dataInicial, intervalo.dataFinal)

    if (intervalo.nome === 'Período')  return <Periodo intervalo={intervalo}/>
    return <Filtro intervalo={intervalo} difDias={diferencaDeDias} />
}
