import { IDados } from "@/types/dados"
import { IFinanceItem } from "@/types/Item"
import { valorFormatadoDB } from "@/utils/formatacaoNumeros"
import { dataValidation, nomeValidation, valorValidation } from "@/utils/validacoes"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function addNewItem(
  dados: IDados,
  setDados: React.Dispatch<React.SetStateAction<IDados>>,
  newItem: IFinanceItem
) {
  const items = dados.items
  const ultimoID = items.at(-1)!.id || 0
  
  let newItemAtualizado: IFinanceItem = {
    id: ultimoID !== undefined ? ultimoID + 1 : 1,
    date: newItem.date,
    nome: newItem.nome,
    value: newItem.value,
    categoryID: newItem.categoryID,
    tipoID: newItem.tipoID
  }
  const [dia,mes,ano] = newItemAtualizado.date.split('/')
  const data = dataValidation(dia, mes, ano)
  const nome = nomeValidation(newItemAtualizado.nome)
  const value = valorValidation(newItemAtualizado.value.toString())
  if (!data || !nome || !value) return
  
  newItemAtualizado.date = `${ano}-${mes}-${dia}`
  newItemAtualizado.value = valorFormatadoDB(newItemAtualizado.value.toString())
  
  const newList = [...items, newItemAtualizado]
  setDados({
    ...dados,
    items: newList,
  })
  AsyncStorage.setItem('@finance:items', JSON.stringify(newList))
}