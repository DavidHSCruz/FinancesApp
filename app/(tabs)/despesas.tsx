import { InputList } from "@/components/InputList/InputList"
import { colors } from "@/constants/colors"
import addNewItem from "@/hooks/useAddItem"
import { IFinanceItem } from "@/types/Item"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"
import { FlatList, StyleSheet, Text, View } from "react-native"

export default function Renda() {
  const tipoDeItem = "despesas"
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
      <InputList 
          action={() => addNewItem(items, setItems, newItem, tipoDeItem)} 
          corTipo={colors.despesa}
          item={newItem} 
          setItem={setNewItem}>
          <Text style={styles.buttonText}>+</Text>
      </InputList>
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
    borderColor: colors.despesa,
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
    backgroundColor: colors.despesa,
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
    backgroundColor: colors.despesa,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: colors.text,
  },
})
