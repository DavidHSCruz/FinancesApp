import { colors } from '@/constants/colors'
import { IFinanceCategory } from '@/types/category'
import { Picker } from '@react-native-picker/picker'
import { useState } from 'react'
import { Text, View } from 'react-native'
import { DadoContainer } from '../DadoContainer/DadoContainer'
import { styles } from './styles'

interface TiposPorCategoriaProps {
    categoriasSemRenda: IFinanceCategory[]
    CORES_POR_TIPO: {
        renda: string;
        investimento: string;
        despesa: string;
    }
}

const TiposPorCategoria = ({categoriasSemRenda, CORES_POR_TIPO}: TiposPorCategoriaProps) => {

    let meses = Array.from({length: 12}).map((_, i) => new Date(0, i).toLocaleString("pt-BR", { month: "long" }))
    meses = meses.map(mes => mes.charAt(0).toUpperCase() + mes.slice(1))
    const dez = meses.slice(0, 1)
    meses = meses.slice(1).concat(dez)

    const hoje = new Date();
    const mesAtual = hoje.toLocaleString("pt-BR", { month: "long" })

    const [tipoSelecionado, setTipoSelecionado] = useState('')

    function handleChange(itemValue: any, field: string) {
        console.log(itemValue, field)
    }


    return (
        <View style={{padding:10}}>
            <Picker
            style={{color: colors.placeholder}} 
            selectedValue={tipoSelecionado}
            onValueChange={(itemValue, itemIndex) => {
                setTipoSelecionado(itemValue)
            }
            }>
                <Picker.Item label="Mês" value="" />
                {meses.map((mes, index) => (
                    <Picker.Item key={index} label={mes} value={mes} />
                    ))
                }
            </Picker>
            <Text style={styles.text}>MARÇO DE 2025</Text>
            {categoriasSemRenda.map((category, index) => (
                <DadoContainer 
                key={index} 
                category={category} 
                cor={CORES_POR_TIPO[category.nome as keyof typeof CORES_POR_TIPO]} />
            ))
            }
        </View>
    );
}

export default TiposPorCategoria
