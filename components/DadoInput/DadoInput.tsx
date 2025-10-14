import { useDadosValue } from "@/context/dadosContext"
import deleteCategoryType from "@/hooks/useDeleteCategoryType"
import { useThemeColors } from "@/hooks/useThemeColors"
import { IFinanceCategoryType } from "@/types/category"
import { formatCurrencyBRLToNumber, valorFormatadoBR } from "@/utils/formatacaoNumeros"
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import { useState } from "react"
import { Pressable, Text, View } from "react-native"
import EditCategory from "../EditCategory/EditCategory"
import { styles } from "./styles"

interface DadoContainerProps {
    tipo: IFinanceCategoryType,
    categoryID: number
}
export const DadoInput = ({ tipo, categoryID }: DadoContainerProps) => {
    const theme = useThemeColors()
    const { dados, intervalo } = useDadosValue()
    const [menuOpened, setMenuOpened] = useState(false)
    const [isEditable, setIsEditable] = useState(false)
    
    const data = intervalo.dataFinal.split('-')[2] + '-' + intervalo.dataFinal.split('-')[1]

    const itemsPorData = dados.items.filter(i => i.date.startsWith(data))
    const itemDaCategoria = itemsPorData
        .filter(i => i.categoryID === categoryID)
        .filter(t => t.tipoID === tipo.id)

    const valoresAcumulados = itemDaCategoria.reduce((acumulador, item) => {
        return acumulador + Number(item.value)
    }, 0)

    const valorPlanejado = tipo.informacoes.find(inf => inf.data === data)?.planejadoValue ? formatCurrencyBRLToNumber(tipo.informacoes.find(inf => inf.data === data)?.planejadoValue || '0') : 0
    const valorDiferenca = valorPlanejado !== 0 && valoresAcumulados !== 0 ? (valorPlanejado - valoresAcumulados) : undefined
    
    const barraWidth = () => {
        const porcentagem = (valoresAcumulados / valorPlanejado) * 100
  
        if (porcentagem >= 100) return 100
        if (porcentagem <= 100 && porcentagem >= 75) return 75
        if (porcentagem <= 25) return 25
        return porcentagem
    }
    const barraColor = () => {
        if (valorDiferenca === undefined) return theme.placeholder
        if (valorDiferenca > 0 || valorDiferenca === 0) return theme.renda
        if (valorDiferenca < 0) return theme.despesa
        return theme.placeholder
    }

    return (
        <View>
            {!isEditable ?
                <>
                    <View style={{flex: 1, flexDirection: 'row', padding: 5, marginLeft: 5, justifyContent: 'space-between'}}>
                            <View>
                                <Text style={{color: theme.textSecondary, fontSize: 16}}>{tipo.nome}</Text>
                                <Text style={{color: theme.textSecondary, fontSize: 12}}>Planejado: {tipo.informacoes.find(i => i.data === data)?.planejadoValue}</Text>
                            </View>
                        <Pressable style={{width: 30, alignItems: 'flex-end'}} onPress={e => setMenuOpened(!menuOpened)}>
                            <MaterialIcons name="more-vert" size={20} color={theme.textPrimary} />
                        </Pressable>

                        {menuOpened && 
                            <Menu 
                                setMenuOpened={setMenuOpened}
                                setIsEditable={setIsEditable}
                                tipoID={tipo.id}
                                categoryID={categoryID} 
                            />
                        }

                    </View>

                    <View style={{position: 'relative', marginBottom: 15}}>
                        <View style={{ ...styles.barraBg, backgroundColor: `${barraColor()}30`, borderRadius: 10, overflow: 'hidden' }}>
                            <Text style={{color: barraColor(), textAlign: 'right', marginRight: 10, fontSize: 10}}>{valorFormatadoBR(valorDiferenca === undefined ? 0 : valorDiferenca)}</Text>

                            <View style={{...styles.barraBg, backgroundColor: valorDiferenca === undefined ? theme.placeholder : barraColor(), width: `${barraWidth()}%`}}>
                                <Text style={{color: theme.surface, textAlign: 'right', marginRight: 10, fontSize: 10}}>{valorFormatadoBR(valoresAcumulados)}</Text>
                            </View>
                        </View>
                    </View>

                </> :
                <EditCategory 
                    tipo={tipo} 
                    categoryID={categoryID} 
                    setIsEditable={setIsEditable} 
                />
            }
        </View>
    )
}

const Menu = ({setMenuOpened, setIsEditable, tipoID, categoryID}: {setMenuOpened: React.Dispatch<React.SetStateAction<boolean>>, setIsEditable: React.Dispatch<React.SetStateAction<boolean>>, tipoID: number, categoryID: number}) => {
    const theme = useThemeColors()
    const {dados, setDados, intervalo} = useDadosValue()

    return (
        <View style={{...styles.menu, backgroundColor: theme.background}}>
            <Pressable style={{flex: 1, alignItems: 'flex-end'}} onPress={e => setMenuOpened(false)}>
                <MaterialCommunityIcons name="close" size={20} color={theme.placeholder} />
            </Pressable>
            <Pressable 
                style={{flex: 1, flexDirection: 'row', gap: 10, paddingHorizontal: 10}}
                onPress={e => {
                    setIsEditable(true)
                    setMenuOpened(false)
                }
            }>
                <MaterialCommunityIcons name="pencil" size={20} color={theme.warning} />
                <Text style={{color:theme.textPrimary}}>Edit</Text>
            </Pressable>
            <Pressable 
                style={{flex: 1, flexDirection: 'row', gap: 10, paddingHorizontal: 10}}
                onPress={e => {
                    deleteCategoryType(dados, setDados, intervalo, tipoID, categoryID)
                    setMenuOpened(false)
                }
            }>
                <MaterialCommunityIcons name="trash-can" size={20} color={theme.textSecondary} />
                <Text style={{color:theme.textPrimary}}>Delete</Text>
            </Pressable>
        </View>
    )
}
