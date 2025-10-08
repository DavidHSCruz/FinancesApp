import { IDados } from "@/types/dados"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function deleteCategoryType(
  dados: IDados, 
  setDados: React.Dispatch<React.SetStateAction<IDados>>, 
  tipoID: number,
  categoryID: number
){

  function deleteTipo() {
    const tipos = dados.categories.filter(cat => cat.id === categoryID)[0].tipos

    return tipos.filter(tipo => tipo.id !== tipoID)
  }

  const itensAtualizados = dados.items.filter(item => {
    if (item.categoryID === categoryID && item.tipoID === tipoID) {
      return false
    }
    return true
  })

  const categoriasAtualizadas = dados.categories.map(category =>
    category.id === categoryID ?
      { 
        ...category,
        tipos: deleteTipo()
      }
      : category
  )
  console.log(JSON.stringify(itensAtualizados, null, 2))
  setDados({
    items: itensAtualizados,
    categories: categoriasAtualizadas
  })
  AsyncStorage.setItem('@finance:categories', JSON.stringify(categoriasAtualizadas))
  AsyncStorage.setItem('@finance:items', JSON.stringify(itensAtualizados))
}