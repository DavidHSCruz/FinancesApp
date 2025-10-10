export type IFinanceCategory = {
  id: number
  nome: "investimento" | "despesa" | "renda"
  tipos: IFinanceCategoryType[]
}

export type IFinanceCategoryType = {
  id: number
  data?: string
  nome: string
  planejadoValue: string
}