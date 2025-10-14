import { colors } from "@/constants/colors"
import { IIntervalo, IntervaloSelector } from "@/types/intervalos"
import { formatarData } from "@/utils/formataData"
import { dataValidation } from "@/utils/validacoes"
import { useEffect, useState } from "react"
import { Pressable, Text, TextInput, View } from "react-native"
import { styles } from "./styles"

interface FiltroProps {
    intervalo: IIntervalo
    setIntervalo: React.Dispatch<React.SetStateAction<IIntervalo>>
    podeAvancar: boolean
    setPodeAvancar: React.Dispatch<React.SetStateAction<boolean>>
}

interface SetaProps {
    intervalo: IIntervalo
    setIntervalo: React.Dispatch<React.SetStateAction<IIntervalo>>
    direcao: '<' | '>'
    setPodeAvancar: React.Dispatch<React.SetStateAction<boolean>>
}

function formataDataBR(data: string) {
    return data.replace(/-/g, '/')
}

function formataPeriodoTexto(di: string, df: string) {
    if (di === df) return formataDataBR(di)

    return `${formataDataBR(di)} - ${formataDataBR(df)}`
}

const FiltroPeriodo = ({intervalo, setIntervalo}: IntervaloSelector) => {
    const [intervaloInput, setIntervaloInput] = useState<IIntervalo>({} as IIntervalo)

    function handleData(e: string) {
        let numeros = e.replace(/\D/g, '')
        numeros = numeros.substring(0, 8)

        const dia = numeros.substring(0, 2) || ''
        const mes = numeros.substring(2, 4) || ''
        let ano = numeros.substring(4, 8) || ''

        if (ano.length === 2) ano = '20' + ano

        return {dia, mes, ano}
    }

    function inputBlur(dataInicial: boolean) {
        const dataUtilizada = dataInicial ? intervaloInput.dataInicial : intervaloInput.dataFinal
        const {dia, mes, ano} = handleData(dataUtilizada)
                        
        dataValidation(dia, mes, ano)
        const dataFormatInput = [dia, mes, ano].filter(Boolean).join('/')
        const dataFormatada = new Date(Number(ano), Number(mes) - 1, Number(dia))

        setIntervalo({ ...intervalo, [dataInicial ? 'dataInicial' : 'dataFinal']: formatarData(dataFormatada) })
        setIntervaloInput({ ...intervaloInput, [dataInicial ? 'dataInicial' : 'dataFinal']: dataFormatInput })
    }

    function handleChange(e: string, dataInicial: boolean) {
        let numeros = e.replace(/\D/g, '')
        numeros = numeros.substring(0, 8)

        setIntervaloInput({ ...intervaloInput, [dataInicial ? 'dataInicial' : 'dataFinal']: numeros })
    }

    return(
        <View style={styles.container}>
            <Text></Text>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <TextInput
                    style={styles.text}
                    onChange={e => handleChange(e.nativeEvent.text, true)}
                    onBlur={e => intervaloInput.dataInicial !== '' && inputBlur(true)}
                    placeholder="DD/MM/AAAA"
                    placeholderTextColor={colors.placeholder}
                    value={intervaloInput.dataInicial}
                />
                <Text style={styles.text}>-</Text>
                <TextInput
                    style={styles.text}
                    onChange={e => handleChange(e.nativeEvent.text, false)}
                    onBlur={e => intervaloInput.dataFinal !== '' && inputBlur(false)}
                    placeholder="DD/MM/AAAA"
                    placeholderTextColor={colors.placeholder}
                    value={intervaloInput.dataFinal}
                />
            </View>
            <Text></Text>
        </View>
    )
}

const Seta = ({intervalo, setIntervalo, direcao, setPodeAvancar}: SetaProps) => {
    const { nome: tipo } = intervalo

    function adicionar(i: string, dataFinal = false) {
        const [ dia, mes, ano ] = i.split('-').map(Number)
        let novaData

        if (!dataFinal) {
            switch (tipo) {
                case 'Semana':
                    novaData = new Date(ano, mes - 1, dia + 7)
                    return formatarData(novaData)
                case 'Mês':
                    novaData = new Date(ano, mes, 1)
                    return formatarData(novaData)
                case 'Ano':
                    novaData = new Date(ano + 1, 0, 1)
                    return formatarData(novaData)
                default:
                    novaData = new Date(ano, mes - 1, dia + 1)
                    return formatarData(novaData)
        }}else {
            const [ diaI, mesI, anoI ] = intervalo.dataInicial.split('-').map(Number)
            switch (tipo) {
                case 'Semana':
                    novaData = new Date(anoI, mesI - 1, diaI + 13)
                    return formatarData(novaData)
                case 'Mês':
                    novaData = new Date(anoI, mesI + 1, 0)
                    return formatarData(novaData)
                case 'Ano':
                    novaData = new Date(anoI + 1, 12, 0)
                    return formatarData(novaData)
                default:
                    novaData = new Date(anoI, mesI - 1, diaI + 1)
                    return formatarData(novaData)
        }}
    }

    function subtrair(i: string, dataFinal = false) {
        const [ dia, mes, ano ] = i.split('-').map(Number)
        let novaData

        if (!dataFinal) {
            switch (tipo) {
                case 'Semana':
                    novaData = new Date(ano, mes - 1, dia - 7)
                    return formatarData(novaData)
                case 'Mês':
                    novaData = new Date(ano, mes - 2, 1)
                    return formatarData(novaData)
                case 'Ano':
                    novaData = new Date(ano - 1, 0, 1)
                    return formatarData(novaData)
                default:
                    novaData = new Date(ano, mes - 1, dia - 1)
                    return formatarData(novaData)
        }}else {
            const [ diaI, mesI, anoI ] = intervalo.dataInicial.split('-').map(Number)
            switch (tipo) {
                case 'Semana':
                    novaData = new Date(anoI, mesI - 1, diaI - 1)
                    return formatarData(novaData)
                case 'Mês':
                    novaData = new Date(anoI, mesI - 1, 0)
                    return formatarData(novaData)
                case 'Ano':
                    novaData = new Date(anoI - 1, 12, 0)
                    return formatarData(novaData)
                default:
                    novaData = new Date(anoI, mesI - 1, diaI - 1)
                    return formatarData(novaData)
        }}
    }
    
    function mudarData() {
        if (direcao === '>') {
            setIntervalo({
                ...intervalo, 
                dataInicial: adicionar(intervalo.dataInicial),
                dataFinal: adicionar(intervalo.dataFinal, true)
            })
        }else {
            setIntervalo({
                ...intervalo, 
                dataInicial: subtrair(intervalo.dataInicial),
                dataFinal: subtrair(intervalo.dataFinal, true)
            })
            setPodeAvancar(true)
        }
    }

    return (
        <Pressable 
            onPress={ e => mudarData() }
        ><Text style={[styles.text, {paddingVertical: 5, paddingHorizontal: 10}]}>{direcao}</Text>
        </Pressable>
    )
}

const Filtro = ({intervalo, setIntervalo, podeAvancar, setPodeAvancar} : FiltroProps) => {
    return (
        <>
            <Seta
                intervalo={intervalo}
                setIntervalo={setIntervalo}
                direcao='<'
                setPodeAvancar={setPodeAvancar}
            />
            <Text style={styles.text}>{formataPeriodoTexto(intervalo.dataInicial, intervalo.dataFinal)}</Text>
            {podeAvancar ?
                <Seta
                    intervalo={intervalo}
                    setIntervalo={setIntervalo}
                    direcao='>'
                    setPodeAvancar={setPodeAvancar}
                />
            :   <Text style={{paddingHorizontal: 12}}></Text>
            }
        </>
    )
}

export const FiltroSelected = ({intervalo, setIntervalo} : IntervaloSelector) => {
    const [podeAvancar, setPodeAvancar] = useState(true)
    
    useEffect(() => {
        if (intervalo.dataInicial === intervalo.dataFinal) setPodeAvancar(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const [ diaF, mesF, anoF ] = intervalo.dataFinal.split('-').map(Number)
        const dataFinal = new Date(anoF, mesF - 1, diaF)
        const dataHoje = new Date()

        if (dataFinal.getDate() >= dataHoje.getDate() &&
            dataFinal.getMonth() >= dataHoje.getMonth() &&
            dataFinal.getFullYear() >= dataHoje.getFullYear()
        ) {
            setPodeAvancar(false)
        }
    }, [intervalo])
    
    return (
        <View style={styles.container}>
            {intervalo.nome === 'Período' ?
                <FiltroPeriodo
                    intervalo={intervalo}
                    setIntervalo={setIntervalo}
                />
            :   <Filtro
                    intervalo={intervalo}
                    setIntervalo={setIntervalo}
                    podeAvancar={podeAvancar}
                    setPodeAvancar={setPodeAvancar}
                />
            }
        </View>
    )
    
}
