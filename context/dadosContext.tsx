import { IDados } from "@/types/dados"
import { IIntervalo } from "@/types/intervalos"
import { createContext, useContext, useState } from "react"

interface IDadosContext {
    dados: IDados
    setDados: React.Dispatch<React.SetStateAction<IDados>>
    intervalo: IIntervalo
    setIntervalo: React.Dispatch<React.SetStateAction<IIntervalo>>
}

const DadosContext = createContext<IDadosContext | undefined>(undefined)

export function DadosProvider({children}: { children: React.ReactNode }) {
    const [dados, setDados] = useState<IDados>({} as IDados)

    const ano = new Date().getFullYear()
    const [intervalo, setIntervalo] = useState({
      nome: "Ano",
      dataInicial: `01-01-${ano}`,
      dataFinal: `31-12-${ano}`
    } as IIntervalo)
    return (
        <DadosContext.Provider value={{ dados, setDados, intervalo, setIntervalo }}>
            { children }
        </DadosContext.Provider>
    )
}

export function useDadosValue() {
    const dadosContext = useContext(DadosContext)
    if (!dadosContext) throw new Error('useDadosValue must be used within a DadosProvider')
        
    return dadosContext
}