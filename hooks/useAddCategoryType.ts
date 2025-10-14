import { IDados } from "@/types/dados"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function addCategoryType(
  dados: IDados, 
  setDados: React.Dispatch<React.SetStateAction<IDados>>, 
  data: string,
  categoryID: number,
  novoTipo: {
    nome: string,
    planejadoValue: string
  }
){
  const tipos = dados.categories.filter(cat => cat.id === categoryID)[0].tipos

  function editTipos() {
      const ultimoID = tipos.at(-1)?.id || 0
      const novoTipoUpdate = [
        ...tipos,
        {
          id: ultimoID !== undefined ? ultimoID + 1 : 1,
          nome: novoTipo.nome,
          informacoes: [
            {
              data: data,
              planejadoValue: novoTipo.planejadoValue
            }
          ]
        }
      ]

      if (tipos.length === 0) {
        return novoTipoUpdate

      }else {
        const existe = tipos.find(t => t.nome === novoTipo.nome)
        if (existe) {
          const existeData = existe.informacoes.find(d => d.data === data)
          if (!existeData) {
            tipos.find(t => t.nome === novoTipo.nome)?.informacoes.push({
              data: data,
              planejadoValue: novoTipo.planejadoValue
            })
          }
          return [...tipos]
        }else {
          return novoTipoUpdate
        }
      }
    }

  if (novoTipo.nome === '' || novoTipo.planejadoValue === '') return
    
  const categoriasAtualizadas = dados.categories.map(category =>
    category.id === categoryID ?
      { 
        ...category,
        tipos: editTipos()
      }
      : category
  )
  
  setDados({
    ...dados,
    categories: categoriasAtualizadas
  })
  AsyncStorage.setItem('@finance:categories', JSON.stringify(categoriasAtualizadas))
}