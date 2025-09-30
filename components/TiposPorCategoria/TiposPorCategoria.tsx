import { useThemeColors } from '@/hooks/useThemeColors'
import { IFinanceCategory } from '@/types/category'
import { Pressable, Text, View } from 'react-native'
import { DadoInput } from '../DadoInput/DadoInput'
import SurfaceContainer from '../SurfaceContainer/SurfaceContainer'
import { styles } from './styles'

const TiposPorCategoria = ({usedCategories}: {usedCategories: IFinanceCategory[]}) => {
    const theme = useThemeColors()
    // let meses = Array.from({length: 12}).map((_, i) => new Date(0, i).toLocaleString("pt-BR", { month: "long" }))
    // meses = meses.map(mes => mes.charAt(0).toUpperCase() + mes.slice(1))
    // const dez = meses.slice(0, 1)
    // meses = meses.slice(1).concat(dez)

    // const hoje = new Date()
    // const mesAtual = hoje.toLocaleString("pt-BR", { month: "long" })

    const cor = (name: string) => {
        if (name === 'despesa') return theme.despesa
        if (name === 'investimento') return theme.investimento
        if (name === 'renda') return theme.renda
        return theme.placeholder
    }

    return (
        <>
            {usedCategories.map(cat => (
                <SurfaceContainer key={cat.id} titulo={cat.nome} cor={cor(cat.nome)} >
                    <View style={{...styles.container, width: '100%'}}>
                        {cat.tipos.map((item) => (
                            <DadoInput
                                key={item.id}
                                tipo={item}
                                categoryID={cat.id}
                            />
                        ))}
                    </View>
                    <Pressable 
                        style={{...styles.button, backgroundColor: theme.background}}
                    >
                        <Text style={{color: theme.textSecondary}}>+ add type</Text>
                    </Pressable>
                </SurfaceContainer>
            ))}
        </>
    )
}

export default TiposPorCategoria
