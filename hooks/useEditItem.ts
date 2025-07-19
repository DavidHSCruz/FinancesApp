import { IFinanceItem } from "@/types/Item"
import { valorFormatadoDB } from "@/utils/formatacaoNumeros"
import { dataValidation, nomeValidation, valorValidation } from "@/utils/validacoes"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function editItem(
  item: IFinanceItem,
  items: IFinanceItem[], 
  setItems: React.Dispatch<React.SetStateAction<IFinanceItem[]>>, 
  editItem: IFinanceItem,
  tipoDeItem: string
){
  let itemEditado: IFinanceItem = {
    id: item.id,
    date: editItem.date,
    nome: editItem.nome,
    value: editItem.value,
  }

  const [dia,mes] = item.date.split('/')
  
  const data = dataValidation(dia, mes)
  const nome = nomeValidation(item.nome)
  const value = valorValidation(item.value.toString())
  if (!data || !nome || !value) return
  
  
  const id = itemEditado.id
  const newList = items.map((item) => item.id === id ? itemEditado : item)
  
  itemEditado.date = `${dia}/${mes}`
  itemEditado.value = valorFormatadoDB(itemEditado.value.toString())
  setItems(newList)
  AsyncStorage.setItem(`@finance:items:${tipoDeItem}`, JSON.stringify(newList))
}