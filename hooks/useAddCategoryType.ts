import { IFinanceCategoryType } from "@/types/category"
import { IDados } from "@/types/dados"
import { IIntervalo } from "@/types/intervalos"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function addCategoryType(
  dados: IDados, 
  setDados: React.Dispatch<React.SetStateAction<IDados>>, 
  intervalo: IIntervalo,
  categoryID: number,
  novoTipo: IFinanceCategoryType
){

  function adicionaTipo() {
      const tipos = dados.categories.filter(cat => cat.id === categoryID)[0].tipos
      const ultimoID = tipos.at(-1)?.id || 0
      const mes = intervalo.dataFinal.split('-')[1]
      const ano = intervalo.dataFinal.split('-')[2]
      const data = `${mes}/${ano}`
      
      return [ 
        ...tipos, 
        {
          id: ultimoID !== undefined ? ultimoID + 1 : 1,
          data: data,
          nome: novoTipo.nome,
          planejadoValue: novoTipo.planejadoValue
        }
      ]
    }

  if (novoTipo.nome === '' || novoTipo.planejadoValue === '') return
    
  const categoriasAtualizadas = dados.categories.map(category =>
    category.id === categoryID ?
      { 
        ...category,
        tipos: adicionaTipo()
      }
      : category
  )
  
  setDados({
    ...dados,
    categories: categoriasAtualizadas
  })
  AsyncStorage.setItem('@finance:categories', JSON.stringify(categoriasAtualizadas))
}