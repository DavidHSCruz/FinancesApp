import Card from "@/components/Card/Card"
import { InputList } from "@/components/InputList/InputList"
import { colors } from "@/constants/colors"
import { useDadosValue } from "@/context/dadosContext"
import addNewItem from "@/hooks/useAddItem"
import { IFinanceItem } from "@/types/Item"
import { useEffect, useState } from "react"
import { FlatList, Text, View } from "react-native"
import { styles } from "./styles"

function selectColor(categoria: 'renda' | 'despesa' | 'investimento') {
  switch (categoria) {
    case 'renda':
      return colors.renda
    case 'despesa':
      return colors.despesa
    case 'investimento':
      return colors.investimento
  }
}

export default function Renda() {
  const categoria = "renda"
  const cor = selectColor(categoria)

  const { dados, setDados } = useDadosValue()
  const categoriaSelecionada = dados.categories.filter(c => c.nome === categoria)[0].id

  //GAMBIARRA FEITA MAS PRECISA ARRUMAR PARA MANDAR PARA OS DADOS
  const [items, setItems] = useState<IFinanceItem[]>(dados.items.filter(i => i.categoryID === categoriaSelecionada))

  useEffect(() => {
    setItems(dados.items.filter(i => i.categoryID === categoriaSelecionada))
  }, [dados])

  const [newItem, setNewItem] = useState<IFinanceItem>({
    id: 0,
    date: '',
    nome: '',
    value: 0,
    categoryID: categoriaSelecionada,
    tipoID: 0
  })

  return (
    <View style={styles.containerBG}>
      <View style={styles.container}>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
              <Card 
                item={item}
                categoria={categoria} 
                cor={cor}
              />
          )}
        />
        <InputList 
          action={() => addNewItem(dados, setDados, newItem, categoria)} 
          corTipo={cor}
          categoria={categoria}
          item={newItem}
          setItem={setNewItem}>
          <Text style={styles.buttonText}>+</Text>
        </InputList>
      </View>
    </View>
  )
}
