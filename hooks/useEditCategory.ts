import { IFinanceCategory, IFinanceCategoryType } from "@/types/category"
import { IDados } from "@/types/dados"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function editCategory(
  item: IFinanceCategoryType,
  dados: IDados, 
  setDados: React.Dispatch<React.SetStateAction<IDados>>, 
  categoryID: number
){

  function novaListaDeTipos(category: IFinanceCategory) {
    return category.tipos.map(tipo =>
            tipo.id === item.id ? item : tipo
          )
  }

  const categoriasAtualizadas = dados.categories.map(category =>
    category.id === categoryID ?
      { 
        ...category,
        tipos: novaListaDeTipos(category)
      }
      : category
  )
  
  setDados({
    ...dados,
    categories: categoriasAtualizadas
  })
  AsyncStorage.setItem('@finance:categories', JSON.stringify(categoriasAtualizadas))
}