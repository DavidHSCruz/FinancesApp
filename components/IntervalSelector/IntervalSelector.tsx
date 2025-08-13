import { colors } from "@/constants/colors"
import { useState } from "react"
import { Pressable, Text, View } from "react-native"
import { styles } from "./styles"

interface IntervalSelectorProps {
    intervalo: IIntervalo,
    setIntervalo: React.Dispatch<React.SetStateAction<{
        intervalo: string,
        dataInicial: Date
    }>>
}

interface IIntervalo {
    intervalo: string,
    dataInicial: Date
}

function formataDataBR(data: Date) {
    return data.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })
}

function formataPeriodoTexto(dataInicial: Date, dataFinal: Date) {
    return `${formataDataBR(dataInicial)} - ${formataDataBR(dataFinal)}`
}

const FiltroSelected = ({intervalo, dataInicial} : IIntervalo) => {
    const hoje = new Date()
    const [data, setData] = useState(hoje)

    if (intervalo !== 'Período' && intervalo !== 'Dia') {
        return (
            <View>
                <Text style={styles.text}>{formataPeriodoTexto(dataInicial, data)}</Text>
            </View>
            )
    }
    if (intervalo === 'Dia') {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <Pressable 
                    onPress={() => setData(new Date(data.getFullYear(), data.getMonth(), data.getDate() - 1))}
                ><Text style={[styles.text, {paddingVertical: 5, paddingHorizontal: 10}]}>{'<'}</Text>
                </Pressable>
                <Text style={styles.text}>{formataDataBR(data)}</Text>
                <Pressable 
                    onPress={() => setData(new Date(data.getFullYear(), data.getMonth(), data.getDate() + 1))}
                ><Text style={[styles.text, {paddingVertical: 5, paddingHorizontal: 10}]}>{'>'}</Text>
                </Pressable>
            </View>
        )
    }
    return (
        <View>
            <Text style={styles.text}>{formataPeriodoTexto(dataInicial, data)}</Text>
        </View>
    )
}

export const IntervalSelector = ({intervalo, setIntervalo}: IntervalSelectorProps) => {
    const hoje = new Date()
    const intervalosSelector = {
        Dia: hoje,
        Semana: new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() - 7),
        Mes: new Date(hoje.getFullYear(), hoje.getMonth() - 1, hoje.getDate()),
        Ano: new Date(hoje.getFullYear() - 1, hoje.getMonth(), hoje.getDate()),
        'Período': '',
    }

    return (
        <>
            <View style={styles.container}>
                {Object.keys(intervalosSelector).map((i, index) => {
                    const data = Object.entries(intervalosSelector).find( intervaloSelecionado => intervaloSelecionado[0] === i)
                    if (data === undefined) return
                    return(
                        <Pressable 
                            key={index} 
                            style={[styles.filtro, intervalo.intervalo === i && styles.filtroSelected]}
                            onPress={() => {

                                setIntervalo({
                                    intervalo: i,
                                    dataInicial: new Date(data[1].toString()),
                                })

                            }}
                        >
                            <Text style={{color: colors.text}}>{i}</Text>
                        </Pressable>
                    )
                })}
            </View>
            <FiltroSelected intervalo={intervalo.intervalo} dataInicial={intervalo.dataInicial} />
        </>
  )
}
