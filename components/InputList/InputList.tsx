import { colors } from "@/constants/colors"
import { useDadosValue } from "@/context/dadosContext"
import { IFinanceItem } from "@/types/Item"
import { Picker } from "@react-native-picker/picker"

import { useState } from "react"
import { NativeSyntheticEvent, Pressable, TextInput, TextInputChangeEventData, View } from "react-native"
import { styles } from "./styles"

interface IInputListProps {
  action: () => void
  corTipo: string
  item: IFinanceItem
  setItem: React.Dispatch<React.SetStateAction<IFinanceItem>>
  categoria?: string
  children: React.ReactNode
}

export const InputList = ({ action, corTipo, item, setItem, categoria, children }: IInputListProps) => {
    const [tipoSelecionado, setTipoSelecionado] = useState(0)
    const dadosContext = useDadosValue()
    if (!dadosContext) throw new Error('useDadosValue must be used within a DadosProvider')
    const { dados } = dadosContext
    const categoriaSelecionada = dados.categories.filter(c => c.nome === categoria)[0]
    const categoriaItems = categoriaSelecionada.tipos
    
    function handleChange(value: string | number, key: keyof IFinanceItem) {
        setItem({ ...item, [key]: value, })
      }
    
      function handleChangeDate(e: NativeSyntheticEvent<TextInputChangeEventData>) {
        const date = e.nativeEvent.text.replace(/[^0-9]/g, '')
        let formatDate = date
        if (date.length > 1) formatDate = date.replace(/(\d{2})(\d{1,2})/, '$1/$2')
    
        handleChange(formatDate, 'date')
      }
    
      function handleChangeValue(e: NativeSyntheticEvent<TextInputChangeEventData>) {
          const value = e.nativeEvent.text.replace(/[^0-9]/g, '')
          let formatValue = value
      
          formatValue = formatValue.replace(/(\d{1,})(\d{2})$/, '$1,$2')
          formatValue = formatValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      
          handleChange(formatValue, 'value')
        }
  
    return (
    <View>
        <View style={[
            styles.picker,
            {
                borderColor: corTipo
            }
        ]}>
            <Picker
                style={{color: colors.placeholder}} 
                selectedValue={tipoSelecionado}
                onValueChange={(itemValue, itemIndex) => {
                    setTipoSelecionado(itemIndex)
                    handleChange(itemIndex, 'tipoID')
                }
                }>
                <Picker.Item label="Categoria..." value="" />
                {categoriaItems.map(item => (
                    <Picker.Item key={item.id} label={item.nome} value={item.nome} />
                    ))
                }
            </Picker>
        </View>
        <View style={styles.inputContainer}>
            <TextInput 
                style={[
                    styles.input,
                    {
                        borderColor: corTipo,
                    }
                ]} 
                keyboardType="numeric" 
                placeholderTextColor={colors.placeholder} 
                placeholder="00/00" maxLength={5} 
                onChange={handleChangeDate} 
                value={item.date} />
            <TextInput 
                style={[
                    styles.input, 
                    {
                        borderColor: corTipo,
                        flex: 2
                    }
                ]} 
                placeholderTextColor={colors.placeholder} 
                placeholder="Nome" 
                onChange={e => handleChange(e.nativeEvent.text, 'nome')} 
                value={item.nome} />
            <TextInput 
                style={[
                    styles.input,
                    {
                        borderColor: corTipo,
                    }
                ]} 
                keyboardType="numeric" 
                placeholderTextColor={colors.placeholder} 
                placeholder="Valor" 
                onChange={handleChangeValue} 
                value={item.value.toString()} />
            <Pressable 
                style={[
                    styles.addButton,
                    {
                        backgroundColor: corTipo,
                    }
                ]} 
                onPress={action}
            >
                {children}
            </Pressable>
        </View>
    </View>
  )
}
