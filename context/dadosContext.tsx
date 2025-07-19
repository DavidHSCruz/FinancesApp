import { useContext, createContext, useState } from "react"
import { IFinanceItem } from "@/types/Item"
import { IFinanceCategory } from "@/types/category"

interface IDados {
    items: IFinanceItem[]
    categories: IFinanceCategory[]
}

interface IDadosContext {
    dados: IDados
    setDados: React.Dispatch<React.SetStateAction<IDados>>
}

const DadosContext = createContext<IDadosContext | undefined>(undefined)


export function DadosProvider({children}: { children: React.ReactNode }) {
    const [dados, setDados] = useState<IDados>({} as IDados)
    return (
        <DadosContext.Provider value={{ dados, setDados }}>
            { children }
        </DadosContext.Provider>
    )
}

export function useDadosValue() {
    return useContext(DadosContext)
}