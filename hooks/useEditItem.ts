import { IFinanceItem } from "@/types/Item"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function editItem(
  item: IFinanceItem,
  items: IFinanceItem[], 
  setItems: React.Dispatch<React.SetStateAction<IFinanceItem[]>>, 
  editItem: IFinanceItem,
  tipoDeItem: string
){
  const itemEditado: IFinanceItem = {
    id: item.id,
    date: editItem.date,
    nome: editItem.nome,
    value: editItem.value,
  }

  const id = itemEditado.id
  const newList = items.map((item) => item.id === id ? itemEditado : item)

  setItems(newList)
  AsyncStorage.setItem(`@finance:items:${tipoDeItem}`, JSON.stringify(newList))
}