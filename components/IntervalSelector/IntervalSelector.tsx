import { colors } from "@/constants/colors"
import { IntervaloSelector } from "@/types/intervalos"
import { formatarData } from "@/utils/formataData"
import { Pressable, Text, View } from "react-native"
import { FiltroSelected } from "./FiltroSelected/FiltroSelected"
import { styles } from "./styles"

export const IntervalSelector = ({intervalo, setIntervalo}: IntervaloSelector) => {
    const hoje = new Date()
    const hojeStr = hoje.toISOString().split('T')[0]
    const [ ano, mes, dia ] = hojeStr.split('-').map(Number)
    const diaDaSemana = new Date(hoje).getDay()

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
                            style={[styles.filtro, intervalo.nome === i && styles.filtroSelected]}
                            onPress={() => {

                                setIntervalo({
                                    nome: i,
                                    dataInicial: data[1].dataInicial,
                                    dataFinal: data[1].dataFinal
                                })

                            }}
                        >
                            <Text style={{color: colors.text}}>{i}</Text>
                        </Pressable>
                    )
                })}
            </View>
            <FiltroSelected intervalo={intervalo} setIntervalo={setIntervalo} />
        </>
  )
}
