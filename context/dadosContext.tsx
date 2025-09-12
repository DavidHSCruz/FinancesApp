import { IDados } from "@/types/dados"
import { createContext, useContext, useState } from "react"

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
    const dadosContext = useContext(DadosContext)
    if (!dadosContext) throw new Error('useDadosValue must be used within a DadosProvider')
        
    return dadosContext
}