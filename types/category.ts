export type IFinanceCategory = {
  id: number
  nome: "investimento" | "despesa" | "renda"
  tipos: IFinanceCategoryType[]
}

export type IFinanceCategoryType = {
  id: number
  nome: string
  informacoes: IDataType[]
}

type IDataType = {
  data: string
  planejadoValue: string
}