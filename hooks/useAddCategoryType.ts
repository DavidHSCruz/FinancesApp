import { IFinanceCategoryType } from "@/types/category"
import { IDados } from "@/types/dados"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function addCategoryType(
  dados: IDados, 
  setDados: React.Dispatch<React.SetStateAction<IDados>>, 
  categoryID: number,
  novoTipo: IFinanceCategoryType
){

  function adicionaTipo() {
      const tipos = dados.categories.filter(cat => cat.id === categoryID)[0].tipos
      const ultimoID = tipos.at(-1)?.id || 0

      return [ 
        ...tipos, 
        {
          id: ultimoID !== undefined ? ultimoID + 1 : 1,
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