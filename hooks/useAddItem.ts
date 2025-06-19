import { IFinanceItem } from "@/types/Item"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default async function addNewItem(items: IFinanceItem[], setItems: React.Dispatch<React.SetStateAction<IFinanceItem[]>>, newItem: IFinanceItem, tipoDeItem: string) {
  let item: IFinanceItem = {
    id: items.length + 1,
    date: newItem.date,
    nome: newItem.nome,
    value: newItem.value,
  }
  const [dia,mes] = item.date.split('/')

  if (parseInt(mes) > 12 || parseInt(dia) > 31) {
    alert('Data inválida')
    return
  }
  if (item.nome === '') {
    alert('Nome inválido')
    return
  }
  if (item.value === 0) {
    alert('Valor inválido')
    return
  }

  item.date = `${dia}-${mes}`

  item.value = Number(item.value.toString().replace(/\./g, '').replace(',', '.'))
  setItems([...items, item])
  AsyncStorage.setItem(`@finance:items:${tipoDeItem}`, JSON.stringify([...items, item]))
}