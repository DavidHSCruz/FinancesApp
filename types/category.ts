export type IFinanceCategory = {
  id: number
  nome: "investimento" | "despesa" | "renda"
  tipos: IFinanceCategoryType[]
}

export type IFinanceCategoryType = {
  id: number
  nome: string
  planejadoValue?: number
}