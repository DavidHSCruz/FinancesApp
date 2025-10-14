import { useDadosValue } from "@/context/dadosContext"
import { useThemeColors } from "@/hooks/useThemeColors"
import { IIntervalo, IntervaloSelector } from "@/types/intervalos"
import { formatarData, formatInputDataMesAno } from "@/utils/formataData"
import { dataValidation } from "@/utils/validacoes"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useEffect, useState } from "react"
import { Pressable, StyleProp, Text, TextInput, TextStyle, View } from "react-native"
import { styles } from "./styles"

interface FiltroProps {
    intervalo: IIntervalo
    setIntervalo: React.Dispatch<React.SetStateAction<IIntervalo>>
    podeAvancar: boolean
    setPodeAvancar: React.Dispatch<React.SetStateAction<boolean>>
}

interface ChangeProps {
    intervalo: IIntervalo
    setIntervalo: React.Dispatch<React.SetStateAction<IIntervalo>>
    tipo?: '<' | '>' | 'input'
    dataMes?: string
    setMes?: React.Dispatch<React.SetStateAction<string>>
    setPodeAvancar: React.Dispatch<React.SetStateAction<boolean>>
    style?: StyleProp<TextStyle>
}

function formataDataBR(data: string) {
    return data.replace(/-/g, '/')
}

function formataPeriodoTexto(intervalo: IIntervalo) {
    const { dataInicial: di, dataFinal: df } = intervalo
    if (di === df) return formataDataBR(di)
    if (intervalo.nome === 'Mês') {
        const [ dia, mes, ano ] = di.split('-')
        return `${mes}/${ano}`
    }

    return `${formataDataBR(di)} - ${formataDataBR(df)}`
}

const FiltroPeriodo = ({intervalo, setIntervalo}: IntervaloSelector) => {
    const [intervaloInput, setIntervaloInput] = useState<IIntervalo>({} as IIntervalo)
    const theme = useThemeColors()

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
                    style={{color: theme.textPrimary}}
                    onChange={e => handleChange(e.nativeEvent.text, true)}
                    onBlur={e => intervaloInput.dataInicial !== '' && inputBlur(true)}
                    placeholder="DD/MM/AAAA"
                    placeholderTextColor={theme.placeholder}
                    value={intervaloInput.dataInicial}
                />
                <Text style={{color: theme.textPrimary}}>-</Text>
                <TextInput
                    style={{color: theme.textPrimary}}
                    onChange={e => handleChange(e.nativeEvent.text, false)}
                    onBlur={e => intervaloInput.dataFinal !== '' && inputBlur(false)}
                    placeholder="DD/MM/AAAA"
                    placeholderTextColor={theme.placeholder}
                    value={intervaloInput.dataFinal}
                />
            </View>
            <Text></Text>
        </View>
    )
}

const FiltroMes = ({intervalo, setIntervalo, podeAvancar, setPodeAvancar} : FiltroProps) => {
    const [intervaloInput, setIntervaloInput] = useState('')
    useEffect(() => setIntervaloInput(formataPeriodoTexto(intervalo)),[intervalo])
    const theme = useThemeColors()
    
    return (
        <>
            <Change
                intervalo={intervalo}
                setIntervalo={setIntervalo}
                tipo='<'
                setPodeAvancar={setPodeAvancar}
            />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TextInput 
                    style={{paddingVertical: 10, color: theme.textSecondary}}
                    value={intervaloInput}
                    placeholder="MM/AAAA"
                    onChange={e => {
                        setIntervaloInput(formatInputDataMesAno(e.nativeEvent.text))
                    }}
                    onBlur={e => {
                        const [ mes, ano ] = intervaloInput.split('/')
                        setIntervalo({...intervalo, dataInicial: `01-${mes}-${ano}`, dataFinal: `30-${mes}-${ano}`})
                    }}
                />
                <MaterialCommunityIcons name="pencil" size={15} color={theme.placeholder} />
            </View>
            {podeAvancar ?
                <Change
                    intervalo={intervalo}
                    setIntervalo={setIntervalo}
                    tipo='>'
                    setPodeAvancar={setPodeAvancar}
                />
            :   <Text style={{paddingHorizontal: 12}}></Text>
            }
        </>
    )
}

const Change = ({intervalo, setIntervalo, tipo, setPodeAvancar, dataMes, setMes, style}: ChangeProps) => {
    const { nome: t } = intervalo
    const theme = useThemeColors()

    function adicionar(i: string, dataFinal = false) {
        const [ dia, mes, ano ] = i.split('-').map(Number)
        let novaData

        if (!dataFinal) {
            switch (t) {
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
            switch (t) {
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
            switch (t) {
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
            switch (t) {
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
        if (tipo === '>') {
            setIntervalo({
                ...intervalo, 
                dataInicial: adicionar(intervalo.dataInicial),
                dataFinal: adicionar(intervalo.dataFinal, true)
            })
        }else if (tipo === '<') {
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
        ><Text style={{paddingVertical: 5, paddingHorizontal: 10, color: theme.textSecondary}}>{tipo}</Text>
        </Pressable>
    )
}

const Filtro = ({intervalo, setIntervalo, podeAvancar, setPodeAvancar} : FiltroProps) => {
    const theme = useThemeColors()

    return (
        <>
            <Change
                intervalo={intervalo}
                setIntervalo={setIntervalo}
                tipo='<'
                setPodeAvancar={setPodeAvancar}
            />
            <Text style={{paddingVertical: 10, color: theme.textSecondary}}>{formataPeriodoTexto(intervalo)}</Text>
            {podeAvancar ?
                <Change
                    intervalo={intervalo}
                    setIntervalo={setIntervalo}
                    tipo='>'
                    setPodeAvancar={setPodeAvancar}
                />
            :   <Text style={{paddingHorizontal: 12}}></Text>
            }
        </>
    )
}

export const FiltroSelected = () => {
    const [podeAvancar, setPodeAvancar] = useState(true)
    const { intervalo, setIntervalo } = useDadosValue()
    
    useEffect(() => {
        if (intervalo.dataInicial === intervalo.dataFinal) setPodeAvancar(false)
        else setPodeAvancar(true)
    }, [intervalo])

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

    if (intervalo.nome === 'Período') {
        return (
            <View style={styles.container}>
                <FiltroPeriodo
                    intervalo={intervalo}
                    setIntervalo={setIntervalo}
                />
            </View>
    )}

    if (intervalo.nome === 'Mês') {
        return (
            <View style={styles.container}>
                <FiltroMes
                    intervalo={intervalo}
                    setIntervalo={setIntervalo}
                    podeAvancar={podeAvancar}
                    setPodeAvancar={setPodeAvancar}
                />
            </View>
    )}
    
    return (
        <View style={styles.container}>
            <Filtro
                intervalo={intervalo}
                setIntervalo={setIntervalo}
                podeAvancar={podeAvancar}
                setPodeAvancar={setPodeAvancar}
            />
        </View>
    )
    
}
