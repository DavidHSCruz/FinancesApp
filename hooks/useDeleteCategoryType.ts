import { IDados } from "@/types/dados"
import { IIntervalo } from "@/types/intervalos"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function deleteCategoryType(
  dados: IDados, 
  setDados: React.Dispatch<React.SetStateAction<IDados>>, 
  intervalo: IIntervalo,
  tipoID: number,
  categoryID: number
){

  const data = intervalo.dataFinal.split('-')[2] + '-' + intervalo.dataFinal.split('-')[1]

  function deleteTipo() {
    const tipos = dados.categories.filter(cat => cat.id === categoryID)[0].tipos

    const tipo = tipos.filter(t => t.id === tipoID)[0]
    const datasAtualizadas = tipo.informacoes.filter(inf => inf.data !== data)

    if (datasAtualizadas.length === 0) {
      return tipos.filter(t => t.id !== tipoID)
    }

    return tipos.map(t => t.id === tipoID ? {...t, informacoes: datasAtualizadas} : t)
  }

  const itensAtualizados = dados.items.filter(item => {
    if (item.categoryID === categoryID && item.tipoID === tipoID && item.date.startsWith(data)) {
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
  
  setDados({
    items: itensAtualizados,
    categories: categoriasAtualizadas
  })
  AsyncStorage.setItem('@finance:categories', JSON.stringify(categoriasAtualizadas))
  AsyncStorage.setItem('@finance:items', JSON.stringify(itensAtualizados))
}