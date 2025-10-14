import { useDadosValue } from "@/context/dadosContext"
import deleteItem from "@/hooks/useDeleteItem"
import { useThemeColors } from "@/hooks/useThemeColors"
import { IFinanceCategory } from "@/types/category"
import { IFinanceItem } from "@/types/Item"
import { valorFormatadoBR } from "@/utils/formatacaoNumeros"
import { formatarDataBR, getDiaMesAno } from "@/utils/formataData"
import { Fragment } from "react"
import { Pressable, StyleProp, Text, View, ViewStyle } from "react-native"
import { styles } from "./styles"

interface TranslacoesResumeProps {
    transacoes: IFinanceItem[]
    categories: IFinanceCategory[]
    titulo?: string
    style?: StyleProp<ViewStyle>
    edit?: boolean
}

export const TranslacoesResume = ({transacoes, categories, titulo, style, edit}: TranslacoesResumeProps) => {
    const theme = useThemeColors()
    const {dados, setDados, intervalo} = useDadosValue()
    const transacoesPorIntervalo = transacoes.filter(t => {
        const [ano, mes, dia] = t.date.split('-')
        const tDate = getDiaMesAno(`${dia}-${mes}-${ano}`)
        const dateI = getDiaMesAno(intervalo.dataInicial)
        const dateF = getDiaMesAno(intervalo.dataFinal)
        const tDateTime = new Date(tDate.ano, tDate.mes, tDate.dia).getTime()
        const dateITime = new Date(dateI.ano, dateI.mes, dateI.dia).getTime()
        const dateFTime = new Date(dateF.ano, dateF.mes, dateF.dia).getTime()

        return tDateTime >= dateITime && tDateTime <= dateFTime
    })

    const transacoesPorData = transacoesPorIntervalo.reduce<Record<string, IFinanceItem[]>>((acc, t) => {
        if(!acc[t.date]) {
            acc[t.date] = []
        }
        acc[t.date].push(t)

        return acc
    }, {})

    const transacoesOrdenadaPorData = Object.entries(transacoesPorData).sort((a, b) => {
        const [anoA, mesA, diaA] = a[0].split('-').map(Number)
        const [anoB, mesB, diaB] = b[0].split('-').map(Number)

        const dateA = new Date(anoA, mesA, diaA).getTime()
        const dateB = new Date(anoB, mesB, diaB).getTime()
        
        return dateB - dateA
    }).map(([date, transacoes]) => {
        return {
            date,
            transacoes
        }
    })

    return (
        <View style={[{width: '100%'}, style]}>
            {titulo &&
                <View style={{paddingHorizontal: 20}}>
                    <View style={{ ...styles.titulosContainer, borderBottomColor: theme.placeholder }}>
                        <Text style={{ ...styles.titulo, color: theme.textSecondary }}>{titulo}</Text>
                    </View>
                </View>
            }
            {transacoesOrdenadaPorData.map((date, index) => {
                const [ano, mes, dia] = date.date.split('-').map(Number)
                return(
                    <Fragment key={index}>
                        <Text style={{color: theme.textSecondary, fontSize: 12, textAlign: 'right', padding: 10}}>{formatarDataBR(new Date(ano, mes - 1, dia))}</Text>
                        <View style={{borderRadius: 20, overflow: 'hidden', gap: 2}}>
                            {date.transacoes.map(t => {
                                const categoria = categories.find(c => c.id === t.categoryID)
                                const tipo = categoria?.tipos.find(ct => ct.id === t.tipoID)
                                
                                
                                const cor = () => {
                                    if (categoria?.nome === 'renda') return theme.renda
                                    if (categoria?.nome === 'despesa') return theme.despesa
                                    if (categoria?.nome === 'investimento') return theme.investimento
                                    return theme.placeholder
                                }

                                return(
                                    <Pressable 
                                        key={t.id} 
                                        style={{ ...styles.container, backgroundColor: `${cor()}30` }}
                                        onPress={e => { edit && deleteItem(dados, setDados, t) }}
                                    >
                                        <Text style={{color: cor()}}>{tipo ? tipo?.nome : 'Renda'}</Text>
                                        <Text style={{color: cor()}}>{t.nome}</Text>
                                        <Text style={{color: cor()}}>{valorFormatadoBR(Number(t.value))}</Text>
                                    </Pressable>
                                )
                            })}
                        </View>
                    </Fragment>
                )
            })}
        </View>
    )
}