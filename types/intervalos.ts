export interface IntervaloSelector {
    intervalo: IIntervalo,
    setIntervalo: React.Dispatch<React.SetStateAction<IIntervalo>>
}

export interface IIntervalo {
    nome: string,
    dataInicial: Date
    dataFinal: Date
}