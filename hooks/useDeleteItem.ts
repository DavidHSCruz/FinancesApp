import { IFinanceItem } from "@/types/Item"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function deleteItem(items: IFinanceItem[], setItems: React.Dispatch<React.SetStateAction<IFinanceItem[]>>, selectItem: IFinanceItem, tipoDeItem: string) {
  const item: IFinanceItem = {
    id: selectItem.id,
    date: selectItem.date,
    nome: selectItem.nome,
    value: selectItem.value,
  }
  const id = item.id
  const newList = items.filter((item) => item.id !== id)

  setItems(newList)
  AsyncStorage.setItem(`@finance:items:${tipoDeItem}`, JSON.stringify(newList))
}