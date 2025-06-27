import { IFinanceItem } from "@/types/Item"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function addNewItem(
  items: IFinanceItem[], 
  setItems: React.Dispatch<React.SetStateAction<IFinanceItem[]>>, 
  newItem: IFinanceItem, 
  tipoDeItem: string
) {
  const ultimoID = items[items.length -1].id
  let item: IFinanceItem = {
    id: ultimoID + 1,
    date: newItem.date,
    nome: newItem.nome,
    value: newItem.value,
  }
  const [dia,mes] = item.date.split('/')

  if (parseInt(mes) > 12 || parseInt(dia) > 31 || dia === undefined || mes === undefined) {
    alert('Data inválida')
    return
  }
  if (item.nome === '') {
    alert('Nome inválido')
    return
  }
  if (Number(item.value) <= 0) {
    alert('Valor inválido')
    return
  }

  item.date = `${dia}/${mes}`
  item.value = Number(item.value.toString().replace(/\./g, '').replace(',', '.')).toFixed(2)

  const newList = [...items, item]
  
  setItems(newList)
  AsyncStorage.setItem(`@finance:items:${tipoDeItem}`, JSON.stringify(newList))
}