import Card from "@/components/Card/Card"
import { InputList } from "@/components/InputList/InputList"
import { colors } from "@/constants/colors"
import { useDadosValue } from "@/context/dadosContext"
import addNewItem from "@/hooks/useAddItem"
import { IFinanceItem } from "@/types/Item"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"
import { FlatList, Text, View } from "react-native"
import { styles } from "./styles"

function selectColor(tipoDeItem: 'renda' | 'despesa' | 'investimento') {
  switch (tipoDeItem) {
    case 'renda':
      return colors.renda
    case 'despesa':
      return colors.despesa
    case 'investimento':
      return colors.investimento
  }
}

export default function Renda() {
  const tipoDeItem = "renda"
  const cor = selectColor(tipoDeItem)
  
  const [items, setItems] = useState<IFinanceItem[]>([])
  const [newItem, setNewItem] = useState<IFinanceItem>({
    id: 0,
    date: '',
    nome: '',
    value: 0
  })
  const dadosContext = useDadosValue()
  if (!dadosContext) throw new Error('useDadosValue must be used within a DadosProvider')
  const { dados, setDados } = dadosContext
  
  useEffect(() => {
  async function loadItems() {
    const storedItems = await AsyncStorage.getItem(`@finance:items`)
    const loadedItems = storedItems ? JSON.parse(storedItems) : []
    setItems(loadedItems)
    console.log(JSON.stringify(loadedItems, null, 2))
    //setDados()
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
