import { colors } from "@/constants/colors"
import { useState, useEffect } from "react"
import { FlatList, NativeSyntheticEvent, Pressable, StyleSheet, Text, TextInput, TextInputChangeEventData, View } from "react-native"
import { IFinanceItem } from "@/types/Item"
import addNewItem from "@/hooks/useAddItem"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function Renda() {
  const tipoDeItem = "investimentos"
  const [items, setItems] = useState<IFinanceItem[]>([])
  const [newItem, setNewItem] = useState<IFinanceItem>({
    id: 0,
    date: '',
    nome: '',
    value: 0
  })
  
  useEffect(() => {
  async function loadItems() {
    const storedItems = await AsyncStorage.getItem(`@finance:items:${tipoDeItem}`)
    const loadedItems = storedItems ? JSON.parse(storedItems) : []
    setItems(loadedItems)
  }
  loadItems()
}, [])

  function handleChange(value: string | number, key: keyof IFinanceItem) {
    setNewItem({ ...newItem, [key]: value, })
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
    <View style={styles.containerBG}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.date}</Text>
            <Text style={styles.itemText}>{item.nome}</Text>
            <Text style={styles.itemText}>{item.value}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} keyboardType="numeric" placeholderTextColor={colors.placeholder} placeholder="00/00" maxLength={5} onChange={handleChangeDate} value={newItem.date} />
        <TextInput style={[styles.input, {flex: 4}]} placeholderTextColor={colors.placeholder} placeholder="Nome" onChange={e => handleChange(e.nativeEvent.text, 'nome')} value={newItem.nome} />
        <TextInput style={styles.input} keyboardType="numeric" placeholderTextColor={colors.placeholder} placeholder="Valor" onChange={handleChangeValue} value={newItem.value.toString()} />
        <Pressable 
          style={styles.addButton} 
          onPress={() => addNewItem(items, setItems, newItem, tipoDeItem)}
        >
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: colors.investimento,
    color: colors.text,
    paddingHorizontal: 10,
    marginRight: 10
  },
  containerBG: {
    padding: 20,
    height: "100%",
    backgroundColor: colors.bg1,
  },
  title: {
    color: colors.text,
    padding: 20,
    fontSize: 24,
    fontWeight: "bold",
  },
  item: {
    backgroundColor: colors.investimento,
    width: "100%",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemText: {
    color: colors.text,
  },
  addButton: {
    backgroundColor: colors.investimento,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: colors.text,
  },
})
