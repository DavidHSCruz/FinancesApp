import { useThemeColors } from "@/hooks/useThemeColors"
import { formatarData } from "@/utils/formataData"
import { Pressable, Text, View } from "react-native"
import { FiltroSelected } from "./FiltroSelected/FiltroSelected"
import { styles } from "./styles"
import { useDadosValue } from "@/context/dadosContext"

export const IntervalSelector = () => {
    const hoje = new Date()
    const { intervalo, setIntervalo } = useDadosValue()
    const hojeStr = hoje.toISOString().split('T')[0]
    const [ ano, mes, dia ] = hojeStr.split('-').map(Number)
    const diaDaSemana = new Date(hoje).getDay()
    const theme = useThemeColors()

    const intervalosDeDatas = {
        Dia: {
            dataInicial: formatarData(hoje),
            dataFinal: formatarData(hoje)
        },
        Semana: {
            dataInicial: formatarData(new Date(ano, mes - 1, dia - diaDaSemana)),
            dataFinal: formatarData(hoje)
        },
        Mês: {
            dataInicial: formatarData(new Date(ano, mes - 1, 1)),
            dataFinal: formatarData(hoje)
        },
        Ano: {
            dataInicial: formatarData(new Date(ano, 0, 1)),
            dataFinal: formatarData(hoje)
        },
        Período: {
            dataInicial: '',
            dataFinal: ''
        }
    }

    return (
        <>
            <View style={styles.container}>
                {Object.keys(intervalosDeDatas).map((i, index) => {
                    const data = Object.entries(intervalosDeDatas).find( intervaloSelecionado => intervaloSelecionado[0] === i)
                    if (data === undefined) return
                    return(
                        <Pressable 
                            key={index} 
                            style={[styles.filtro, intervalo.nome === i && styles.filtroSelected, {borderColor: theme.textPrimary}]}
                            onPress={() => {

                                setIntervalo({
                                    nome: i,
                                    dataInicial: data[1].dataInicial,
                                    dataFinal: data[1].dataFinal
                                })

                            }}
                        >
                            <Text style={intervalo.nome === i ? {color: theme.textPrimary} : {color: theme.textSecondary}}>{i}</Text>
                        </Pressable>
                    )
                })}
            </View>
            <FiltroSelected />
        </>
  )
}
