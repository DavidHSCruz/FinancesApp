import { IDados } from "@/types/dados"
import { IFinanceItem } from "@/types/Item"
import { valorFormatadoDB } from "@/utils/formatacaoNumeros"
import { dataValidation, nomeValidation, valorValidation } from "@/utils/validacoes"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function editItem(
  item: IFinanceItem,
  dados: IDados, 
  setDados: React.Dispatch<React.SetStateAction<IDados>>, 
  editItem: IFinanceItem
){
  let itemEditado: IFinanceItem = {
    id: item.id,
    date: editItem.date,
    nome: editItem.nome,
    value: editItem.value,
    categoryID: item.categoryID,
    tipoID: editItem.tipoID
  }

  
  const [dia,mes] = editItem.date.split('/')
  const data = dataValidation(dia, mes)
  const nome = nomeValidation(item.nome)
  const value = valorValidation(item.value.toString())
  if (!data || !nome || !value) return
  
  
  const id = itemEditado.id
  const newList = dados.items.map((item) => item.id === id ? itemEditado : item)
  
  itemEditado.date = `${dia}/${mes}`
  itemEditado.value = valorFormatadoDB(itemEditado.value.toString())
  
  setDados({
    ...dados,
    items: newList
  })
  AsyncStorage.setItem('@finance:items', JSON.stringify(newList))
}