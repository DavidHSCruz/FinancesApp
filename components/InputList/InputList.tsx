import { colors } from "@/constants/colors"
import { IFinanceItem } from "@/types/Item"
import { NativeSyntheticEvent, Pressable, TextInput, TextInputChangeEventData, View } from "react-native"
import { styles } from "./styles"

interface IInputListProps {
  action: () => void
  corTipo: string
  item: IFinanceItem
  setItem: React.Dispatch<React.SetStateAction<IFinanceItem>>
  children: React.ReactNode
}

export const InputList = ({ action, corTipo, item, setItem, children }: IInputListProps) => {

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
                    flex: 4
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
  )
}
