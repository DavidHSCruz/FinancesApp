import { useThemeColors } from "@/hooks/useThemeColors"
import { IFinanceCategory } from "@/types/category"
import { IFinanceItem } from "@/types/Item"
import { valorFormatadoBR } from "@/utils/formatacaoNumeros"
import { formatarDataBR } from "@/utils/formataData"
import { Text, View } from "react-native"
import { styles } from "./styles"

export const TranslacoesResume = ({translacoes, categories}: {translacoes: IFinanceItem[], categories: IFinanceCategory[]}) => {
    const theme = useThemeColors()
    return (
        <View style={{width: '90%', borderRadius: 20, overflow: 'hidden'}}>
            {translacoes.map(t => {
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