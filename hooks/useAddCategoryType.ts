import { IDados } from "@/types/dados"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function addCategoryType(
  dados: IDados, 
  setDados: React.Dispatch<React.SetStateAction<IDados>>, 
  categoryID: number
){

  function adicionaTipo() {
      const tipos = dados.categories.filter(cat => cat.id === categoryID)[0].tipos
      const ultimoID = tipos.at(-1)?.id

      return [
          ...tipos,
          {
            id: ultimoID !== undefined ? ultimoID + 1 : 0,
            nome: "Nome",
            planejadoValue: "R$ 0,00"
          }
      ]
  }

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