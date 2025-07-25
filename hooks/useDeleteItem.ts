import { IDados } from "@/types/dados"
import { IFinanceItem } from "@/types/Item"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function deleteItem(
  dados: IDados, 
  setDados: React.Dispatch<React.SetStateAction<IDados>>, 
  selectItem: IFinanceItem
) {
  const item: IFinanceItem = {
    id: selectItem.id,
    date: selectItem.date,
    nome: selectItem.nome,
    value: selectItem.value,
    categoryID: selectItem.categoryID,
    tipoID: selectItem.tipoID
  }
  const id = item.id
  const newList = dados.items.filter((item) => item.id !== id)

  setDados({
    ...dados,
    items: newList
  })
  AsyncStorage.setItem('@finance:items', JSON.stringify(newList))
}