import { dataValidation } from "@/utils/validacoes"
import { useEffect, useState } from "react"
import { Pressable, Text, TextInput, View } from "react-native"
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

function calculaDiferencaDias(dataInicial: Date, dataFinal: Date) {
    const dataInicialUTC = new Date(dataInicial.getTime() + dataInicial.getTimezoneOffset() * 60000)
    const dataFinalUTC = new Date(dataFinal.getTime() + dataFinal.getTimezoneOffset() * 60000)
    const diferencaEmMilissegundos = dataFinalUTC.getTime() - dataInicialUTC.getTime()
    let diferencaEmDias = diferencaEmMilissegundos / (1000 * 60 * 60 * 24)
    if (diferencaEmDias === 0) diferencaEmDias = 1
    return diferencaEmDias
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

const FiltroPeriodo = ({intervalo, setIntervalo}: {intervalo: IIntervalo, setIntervalo: React.Dispatch<React.SetStateAction<IIntervalo>>}) => {

    const [intervaloInput, setIntervaloInput] = useState({dataInicial: '00/00/0000', dataFinal: '00/00/0000'})

    function handleData(e: string) {
        let numeros = e.replace(/\D/g, '')
        numeros = numeros.substring(0, 8)

        const dia = numeros.substring(0, 2) || ''
        const mes = numeros.substring(2, 4) || ''
        let ano = numeros.substring(4, 8) || ''

        if (ano.length === 2) ano = '20' + ano

        return {dia, mes, ano}
    }

    return(
        <View style={styles.container}>
            <Text></Text>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <TextInput 
                    style={styles.text} 
                    onChange={e => {
                        let numeros = e.nativeEvent.text.replace(/\D/g, '')
                        numeros = numeros.substring(0, 8)
                        setIntervaloInput({ ...intervaloInput, dataInicial: numeros })
                    }}
                    onBlur={e => {
                        const {dia, mes, ano} = handleData(intervaloInput.dataInicial)
                        
                        dataValidation(dia, mes, ano)
                        const dataFormatada = [dia, mes, ano].filter(Boolean).join('/')
                        setIntervalo({ ...intervalo, dataInicial: new Date(dataFormatada) })
                        setIntervaloInput({ ...intervaloInput, dataInicial: dataFormatada })
                    }}
                    value={intervaloInput.dataInicial} />
                <Text style={styles.text}>-</Text>
                <TextInput 
                    style={styles.text} 
                    onChange={e => {
                        let numeros = e.nativeEvent.text.replace(/\D/g, '')
                        numeros = numeros.substring(0, 8)
                        setIntervaloInput({ ...intervaloInput, dataFinal: numeros })
                    }}
                    onBlur={e => {
                        const {dia, mes, ano} = handleData(intervaloInput.dataFinal)

                        dataValidation(dia, mes, ano)
                        const dataFormatada = [dia, mes, ano].filter(Boolean).join('/')
                        setIntervalo({ ...intervalo, dataFinal: new Date(dataFormatada) })
                        setIntervaloInput({ ...intervaloInput, dataFinal: dataFormatada })
                    }}
                    value={intervaloInput.dataFinal} />
            </View>
            <Text></Text>
        </View>
    )
}

export const FiltroSelected = ({intervalo, setIntervalo} : {intervalo: IIntervalo, setIntervalo: React.Dispatch<React.SetStateAction<IIntervalo>>}) => {
    const diferencaDeDias = calculaDiferencaDias(intervalo.dataInicial, intervalo.dataFinal)

    if (intervalo.nome === 'Período')  return <FiltroPeriodo intervalo={intervalo} setIntervalo={setIntervalo}/>
    return <Filtro intervalo={intervalo} difDias={diferencaDeDias} />
}
