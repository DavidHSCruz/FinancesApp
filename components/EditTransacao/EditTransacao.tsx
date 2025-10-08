import { useDadosValue } from '@/context/dadosContext'
import addNewItem from '@/hooks/useAddItem'
import { useThemeColors } from '@/hooks/useThemeColors'
import { IFinanceItem } from '@/types/Item'
import { formatInputCurrencyBRL } from '@/utils/formatacaoNumeros'
import { formatInputDataDiaMesAno } from '@/utils/formataData'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useMemo, useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'

interface EditTransacaoProps {
    transacao: IFinanceItem
    setIsEditable: React.Dispatch<React.SetStateAction<boolean>>
    add?: boolean
}
const EditTransacao = ({transacao, setIsEditable, add}: EditTransacaoProps) => {
    const theme = useThemeColors()
    const [newTransacao, setNewTransacao] = useState(transacao)
    const {dados, setDados} = useDadosValue()
    const hideCheck = useMemo(() => {
        if (newTransacao.nome !== '' && newTransacao.value !== '' &&
            newTransacao.date !== '' && newTransacao.categoryID !== -1 && newTransacao.tipoID !== -1) return false
        return true
    }, [newTransacao])


    
    return (
        <View style={{width: '100%'}}>
            <View>
                <Text style={{color: theme.textSecondary, marginTop: 20, fontSize: 10, paddingLeft:10}}>Data:</Text>
                <TextInput
                    style={{color: theme.textSecondary, fontSize: 16, padding: 10, backgroundColor: theme.background}} 
                    value={newTransacao.date}
                    keyboardType="numeric"
                    placeholder="Dia"
                    placeholderTextColor={theme.placeholder}
                    onChangeText={e => {
                        const valor = formatInputDataDiaMesAno(e)
                        setNewTransacao({ ...newTransacao, date: valor })
                    }}
                    
                />
                <Text style={{color: theme.textSecondary, fontSize: 10, paddingLeft:10}}>Nome:</Text>
                <TextInput
                    style={{color: theme.textSecondary, fontSize: 16, padding: 10, backgroundColor: theme.background}} 
                    value={newTransacao.nome}
                    placeholder="Digite o nome"
                    placeholderTextColor={theme.placeholder}
                    onChangeText={e => setNewTransacao({...newTransacao, nome: e})}
                    
                />
                <Text style={{color: theme.textSecondary, fontSize: 10, paddingLeft:10 }}>Valor:</Text>
                <TextInput
                    style={{color: theme.textSecondary, fontSize: 16, padding: 10, backgroundColor: theme.background}} 
                    value={newTransacao.value.toString()}
                    keyboardType="numeric"
                    placeholder="R$ 0,00"
                    placeholderTextColor={theme.placeholder}
                    onChangeText={ e => {
                        const valor = formatInputCurrencyBRL(e)
                        setNewTransacao({  ...newTransacao, value: valor })
                    }}
                />
            </View>
            <View style={{flex: 1, flexDirection: 'row', gap: 10, position: 'absolute', top: 10, right: 0}}>
                <Pressable onPress={e => {
                    setNewTransacao(transacao)
                    setIsEditable(false)
                }}>
                    <MaterialCommunityIcons name="close" size={20} color={theme.placeholder} />
                </Pressable>
                {!hideCheck &&
                    <Pressable onPress={e => {
                        if (add) addNewItem(dados, setDados, newTransacao)
                        //else editItem(item, dados, setDados, editItem)
                        setIsEditable(false)
                    }}>
                        <MaterialCommunityIcons name="check" size={20} color={theme.renda} />
                    </Pressable>
                }
            </View>
        </View>
    )
}

export default EditTransacao