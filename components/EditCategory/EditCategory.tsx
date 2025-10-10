import { useDadosValue } from '@/context/dadosContext'
import addCategoryType from '@/hooks/useAddCategoryType'
import editCategoryType from '@/hooks/useEditCategoryType'
import { useThemeColors } from '@/hooks/useThemeColors'
import { IFinanceCategoryType } from '@/types/category'
import { formatInputCurrencyBRL } from '@/utils/formatacaoNumeros'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useMemo, useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'

interface EditCategoryProps {
    tipo: IFinanceCategoryType
    categoryID: number
    setIsEditable: React.Dispatch<React.SetStateAction<boolean>>
    addType?: boolean
}
const EditCategory = ({tipo, categoryID, setIsEditable, addType}: EditCategoryProps) => {
    const theme = useThemeColors()
    const [novoTipo, setNovoTipo] = useState(tipo)
    const {dados, setDados, intervalo} = useDadosValue()
    const hideCheck = useMemo(() => {
        if (novoTipo.nome !== '' && novoTipo.planejadoValue !== '') return false
        return true
    }, [novoTipo])


    
    return (
        <View>
            <View>
                <Text style={{color: theme.textSecondary, marginTop: 20, fontSize: 10, paddingLeft:10}}>Nome:</Text>
                <TextInput
                    style={{color: theme.textSecondary, fontSize: 16, padding: 10, backgroundColor: theme.background}} 
                    value={novoTipo.nome}
                    placeholder="Digite o nome"
                    placeholderTextColor={theme.placeholder}
                    onChangeText={e => setNovoTipo({...novoTipo, nome: e})}
                    
                />
                <Text style={{color: theme.textSecondary, fontSize: 10, paddingLeft:10 }}>Planejado:</Text>
                <TextInput
                    style={{color: theme.textSecondary, fontSize: 16, padding: 10, backgroundColor: theme.background}} 
                    value={novoTipo.planejadoValue.toString()}
                    keyboardType="numeric"
                    placeholder="R$ 0,00"
                    placeholderTextColor={theme.placeholder}
                    onChangeText={ e => {
                        const valor = formatInputCurrencyBRL(e)

                        setNovoTipo({ 
                            ...novoTipo,
                            planejadoValue: valor
                        })
                    }
                    }
                />
            </View>
            <View style={{flex: 1, flexDirection: 'row', gap: 10, position: 'absolute', top: 10, right: 0}}>
                <Pressable onPress={e => {
                    setNovoTipo(tipo)
                    setIsEditable(false)
                }}>
                    <MaterialCommunityIcons name="close" size={20} color={theme.placeholder} />
                </Pressable>
                {!hideCheck &&
                    <Pressable onPress={e => {
                        if (addType) addCategoryType(dados, setDados, intervalo, categoryID, novoTipo)
                        else editCategoryType(novoTipo, dados, setDados, categoryID)
                        setIsEditable(false)
                    }}>
                        <MaterialCommunityIcons name="check" size={20} color={theme.renda} />
                    </Pressable>
                }
            </View>
        </View>
    )
}

export default EditCategory