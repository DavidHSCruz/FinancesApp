import { useThemeColors } from "@/hooks/useThemeColors"
import { IFinanceCategory } from "@/types/category"
import { IIntervalo } from "@/types/intervalos"
import { IFinanceItem } from "@/types/Item"
import { valorFormatadoBR } from "@/utils/formatacaoNumeros"
import { formatarDataBR, getDiaMesAno } from "@/utils/formataData"
import { Text, View } from "react-native"
import { styles } from "./styles"

interface TranslacoesResumeProps {
    translacoes: IFinanceItem[]
    categories: IFinanceCategory[]
    intervalo: IIntervalo
}

export const TranslacoesResume = ({translacoes, categories, intervalo}: TranslacoesResumeProps) => {
    const theme = useThemeColors()

    const translacoesPorIntervalo = translacoes.filter(t => {
        const [ano, mes, dia] = t.date.split('-')
        const tDate = getDiaMesAno(`${dia}-${mes}-${ano}`)
        const dateI = getDiaMesAno(intervalo.dataInicial)
        const dateF = getDiaMesAno(intervalo.dataFinal)
        const tDateTime = new Date(tDate.ano, tDate.mes, tDate.dia).getTime()
        const dateITime = new Date(dateI.ano, dateI.mes, dateI.dia).getTime()
        const dateFTime = new Date(dateF.ano, dateF.mes, dateF.dia).getTime()

        return tDateTime >= dateITime && tDateTime <= dateFTime
    })
    
    return (
        <View style={{width: '90%', borderRadius: 20, overflow: 'hidden', gap: 2}}>
            {translacoesPorIntervalo.map(t => {
                const categoria = categories.find(c => c.id === t.categoryID)
                const tipo = categoria?.tipos.find(ct => ct.id === t.tipoID)
                const [ano, mes, dia] = t.date.split('-').map(Number)
                
                const cor = () => {
                    if (categoria?.nome === 'despesa') return theme.despesa
                    if (categoria?.nome === 'investimento') return theme.investimento
                    return theme.textPrimary
                }

                return(
                    <View key={t.id} style={{ ...styles.container, backgroundColor: `${cor()}30` }}>
                        <Text style={{color: cor()}}>{formatarDataBR(new Date(ano, mes, dia))}</Text>
                        <Text style={{color: cor()}}>{tipo?.nome}</Text>
                        <Text style={{color: cor()}}>{valorFormatadoBR(Number(t.value))}</Text>
                    </View>
                )
            })}
        </View>
    )
}