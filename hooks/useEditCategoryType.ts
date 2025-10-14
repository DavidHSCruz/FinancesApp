import { IFinanceCategory, IFinanceCategoryType } from "@/types/category"
import { IDados } from "@/types/dados"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function editCategoryType(
  tipoPadrao: IFinanceCategoryType,
  novoTipo: {
    nome: string,
    planejadoValue: string
  },
  dados: IDados, 
  setDados: React.Dispatch<React.SetStateAction<IDados>>, 
  data: string,
  categoryID: number
){

  function novaListaDeTipos(category: IFinanceCategory) {
    return category.tipos.map(tipo => {
      if (tipo.nome === tipoPadrao.nome) {
        return {
          ...tipo,
          nome: novoTipo.nome,
          informacoes: tipo.informacoes.map(inf => {
            return inf.data === data ? {...inf, planejadoValue: novoTipo.planejadoValue} : inf
          })
        }
      }else {
        return tipo
      }
    })
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