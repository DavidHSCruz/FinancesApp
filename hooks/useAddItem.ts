import { IFinanceItem } from "@/types/Item"
import { valorFormatadoDB } from "@/utils/formatacaoNumeros"
import { dataValidation, nomeValidation, valorValidation } from "@/utils/validacoes"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function addNewItem(
  items: IFinanceItem[], 
  setItems: React.Dispatch<React.SetStateAction<IFinanceItem[]>>, 
  newItem: IFinanceItem, 
  tipoDeItem: string
) {

  let ultimoID = 0
  if(items.length !== 0) ultimoID = items[items.length -1].id
  
  let item: IFinanceItem = {
    id: items.length !== 0 ? ultimoID + 1 : 0,
    date: newItem.date,
    nome: newItem.nome,
    value: newItem.value,
  }
  const [dia,mes] = item.date.split('/')

  const data = dataValidation(dia, mes)
  const nome = nomeValidation(item.nome)
  const value = valorValidation(item.value.toString())
  if (!data || !nome || !value) return

  item.date = `${dia}/${mes}`
  item.value = valorFormatadoDB(item.value.toString())

  const newList = [...items, item]
  
  setItems(newList)
  AsyncStorage.setItem(`@finance:items:${tipoDeItem}`, JSON.stringify(newList))
}