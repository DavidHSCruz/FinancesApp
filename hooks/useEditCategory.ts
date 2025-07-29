import { IFinanceCategoryType } from "@/types/category"
import { IDados } from "@/types/dados"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function editCategory(
  item: IFinanceCategoryType,
  dados: IDados, 
  setDados: React.Dispatch<React.SetStateAction<IDados>>, 
  categoryID: number
){

  
  // setDados({
  //   ...dados,
  //   categories: newList
  // })
  //AsyncStorage.setItem('@finance:categories', JSON.stringify(newList))
}