import { useDadosValue } from "@/context/dadosContext"
import { useThemeColors } from "@/hooks/useThemeColors"
import { IFinanceCategoryType } from "@/types/category"
import { valorFormatadoBR } from "@/utils/formatacaoNumeros"
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import { useState } from "react"
import { Pressable, Text, TextInput, View } from "react-native"
import { styles } from "./styles"

interface DadoContainerProps {
    tipo: IFinanceCategoryType,
    categoryID: number
}
export const DadoInput = ({ tipo, categoryID }: DadoContainerProps) => {
    const theme = useThemeColors()
    const {dados, setDados} = useDadosValue()
    const [menuOpened, setMenuOpened] = useState(false)
    const [isEditable, setIsEditable] = useState(false)
    const [tipoName, setTipoName] = useState(tipo)

    const itemDaCategoria = dados.items.filter(i => i.categoryID === categoryID).filter(t => t.tipoID === tipo.id)
    const categorySelected = dados.categories.filter(c => c.id === categoryID)[0]
    const valoresAcumulados = itemDaCategoria.reduce((acumulador, item) => {
        return acumulador + Number(item.value)
    }, 0)

    const valorPlanejado = Number(
        tipo.planejadoValue
            .toString()
            .replace(/R\$\s*/g, '')
            .replace('.', '')
            .replace(',', '.')
    )
    const valorDiferenca = (valorPlanejado - valoresAcumulados)
    const barraWidth = () => {
        const porcentagem = (valoresAcumulados / valorPlanejado) * 100
        if (porcentagem >= 100) return 100
        if (porcentagem >= 75) return 75
        if (porcentagem <= 20) return 20
        return 0
    }
    const barraColor = () => {
        if (valorDiferenca > 0) return theme.renda
        if (valorDiferenca === 0) return theme.placeholder
        if (valorDiferenca < 0) return theme.despesa
        return theme.placeholder
    }

    return (
        <View >
            {!isEditable ?
            <>
                <View style={{flex: 1, flexDirection: 'row', padding: 5, marginLeft: 5, justifyContent: 'space-between'}}>
                        <View>
                            <Text style={{color: theme.textSecondary, fontSize: 16}}>{tipo.nome}</Text>
                            <Text style={{color: theme.textSecondary, fontSize: 12}}>Planejado: {tipo.planejadoValue}</Text>
                        </View>
                    <Pressable style={{width: 30, alignItems: 'flex-end'}} onPress={e => setMenuOpened(!menuOpened)}>
                        <MaterialIcons name="more-vert" size={20} color={theme.textPrimary} />
                    </Pressable>
                    {menuOpened && <Menu setMenuOpened={setMenuOpened} setIsEditable={setIsEditable} />}
                </View>
                <View style={{position: 'relative', marginBottom: 15}}>
                    <View style={{ ...styles.barraBg, backgroundColor: `${barraColor()}30`, borderRadius: 10, overflow: 'hidden' }}>
                        <Text style={{color: barraColor(), textAlign: 'right', marginRight: 10, fontSize: 10}}>{valorFormatadoBR(valorDiferenca)}</Text>

                        <View style={{...styles.barraBg, backgroundColor: barraColor(), width: `${barraWidth()}%`}}>
                            <Text style={{color: theme.surface, textAlign: 'right', marginRight: 10, fontSize: 10}}>{valorFormatadoBR(valoresAcumulados)}</Text>
                        </View>
                    </View>
                </View>
            </> :
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                    <TextInput 
                        style={{color: theme.textSecondary, fontSize: 16}} 
                        value={tipoName.nome}
                        onChangeText={e => setTipoName({...tipoName, nome: e})}
                    />
                    <TextInput
                        style={{color: theme.textSecondary, fontSize: 16}} 
                        value={tipoName.planejadoValue.toString()}
                        onChangeText={e => setTipoName({...tipoName, planejadoValue: e})}
                    />
                </View>
                <Pressable style={{flex: 1, alignItems: 'flex-end'}} onPress={e => setIsEditable(false)}>
                    <MaterialCommunityIcons name="close" size={20} color={theme.placeholder} />
                </Pressable>
            </View>
            }

        </View>
    )
}

const Menu = ({setMenuOpened, setIsEditable}: {setMenuOpened: React.Dispatch<React.SetStateAction<boolean>>, setIsEditable: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const theme = useThemeColors()

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
                <Text>Edit</Text>
            </Pressable>
            <Pressable 
                style={{flex: 1, flexDirection: 'row', gap: 10, paddingHorizontal: 10}} 
                onPress={e => {
                    setMenuOpened(false)
                }
            }>
                <MaterialCommunityIcons name="trash-can" size={20} color={theme.textSecondary} />
                <Text>Delete</Text>
            </Pressable>
        </View>
    )
}
