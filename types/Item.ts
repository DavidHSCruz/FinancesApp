export type IFinanceItem = {
  id: number
  date: string
  nome: string
  value: string | number
  categoryID?: number
  tipoID?: number
}