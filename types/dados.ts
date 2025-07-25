import { IFinanceCategory } from "./category"
import { IFinanceItem } from "./Item"

export type IDados = {
    items: IFinanceItem[]
    categories: IFinanceCategory[]
}