import Card from "@/components/Card/Card"
import { InputList } from "@/components/InputList/InputList"
import { colors } from "@/constants/colors"
import addNewItem from "@/hooks/useAddItem"
import { IFinanceItem } from "@/types/Item"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"
import { FlatList, Text, View } from "react-native"
import { styles } from "./styles"

type TipoDeItemProps = 'renda' | 'despesa' | 'investimento'


function selectColor(tipoDeItem: TipoDeItemProps) {
  switch (tipoDeItem) {
    case 'renda':
      return colors.renda
    case 'despesa':
      return colors.despesa
    case 'investimento':
      return colors.investimento
  }
}

export default function Despesas() {
  const tipoDeItem: TipoDeItemProps = "despesa"
  const cor = selectColor(tipoDeItem)
  
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
      <View style={styles.container}>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
              <Card 
                item={item}
                newItem={newItem}
                setItem={setNewItem}
                items={items} 
                setItems={setItems} 
                tipoDeItem={tipoDeItem}
                cor={cor}
              />
          )}
        />
        <InputList 
          action={() => addNewItem(items, setItems, newItem, tipoDeItem)} 
          corTipo={cor}
          item={newItem} 
          setItem={setNewItem}>
          <Text style={styles.buttonText}>+</Text>
        </InputList>
      </View>
    </View>
  )
}
