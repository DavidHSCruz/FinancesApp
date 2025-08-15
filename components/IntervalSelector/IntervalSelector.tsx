import { colors } from "@/constants/colors"
import { Pressable, Text, View } from "react-native"
import { FiltroSelected } from "./FiltroSelected/FiltroSelected"
import { styles } from "./styles"
import { IntervaloSelector } from "@/types/intervalos"

export const IntervalSelector = ({intervalo, setIntervalo}: IntervaloSelector) => {
    const hoje = new Date()
    const diaDaSemana = hoje.getDay()
    const intervalosDeDatas = {
        Dia: {
            dataInicial: new Date(hoje),
            dataFinal: new Date(hoje)
        },
        Semana: {
            dataInicial: new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() - diaDaSemana),
            dataFinal: new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() - diaDaSemana + 6)
        },
        'Mês': {
            dataInicial: new Date(hoje.getFullYear(), hoje.getMonth(), 1),
            dataFinal: new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0)
        },
        Ano: {
            dataInicial: new Date(hoje.getFullYear(), 0, 1),
            dataFinal: new Date(hoje.getFullYear(), 11, 31)
        },
        'Período': {
            dataInicial: new Date(),
            dataFinal: new Date()
        },
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
                                    dataInicial: new Date(data[1].dataInicial.toString()),
                                    dataFinal: new Date(data[1].dataFinal.toString())
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
