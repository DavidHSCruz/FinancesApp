import { IDados } from "@/types/dados"
import { IFinanceItem } from "@/types/Item"
import { valorFormatadoDB } from "@/utils/formatacaoNumeros"
import { dataValidation, nomeValidation, valorValidation } from "@/utils/validacoes"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function addNewItem(
  dados: IDados,
  setDados: React.Dispatch<React.SetStateAction<IDados>>,
  newItem: IFinanceItem,
  tipoDeItem: string
) {
  const items = dados.items
  let ultimoID = 0
  if(items.length !== 0) ultimoID = items[items.length -1].id
  
  let newItemAtualizado: IFinanceItem = {
    id: items.length !== 0 ? ultimoID + 1 : 0,
    date: newItem.date,
    nome: newItem.nome,
    value: newItem.value,
    categoryID: newItem.categoryID,
    tipoID: newItem.tipoID
  }
  const [dia,mes] = newItemAtualizado.date.split('/')

  const data = dataValidation(dia, mes)
  const nome = nomeValidation(newItemAtualizado.nome)
  const value = valorValidation(newItemAtualizado.value.toString())
  if (!data || !nome || !value) return

  newItemAtualizado.date = `${dia}/${mes}`
  newItemAtualizado.value = valorFormatadoDB(newItemAtualizado.value.toString())

  const newList = [...items, newItemAtualizado]
  setDados({
    ...dados,
    items: newList,
  })
  AsyncStorage.setItem('@finance:items', JSON.stringify(newList))
}