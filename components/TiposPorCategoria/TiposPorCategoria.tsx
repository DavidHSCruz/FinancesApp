import { IFinanceCategory } from '@/types/category'
import { useState } from 'react'
import { View } from 'react-native'
import Button from '../Button/Button'
import { DadoInput } from '../DadoInput/DadoInput'
import EditCategory from '../EditCategory/EditCategory'
import { styles } from './styles'

const TiposPorCategoria = ({cat}: {cat: IFinanceCategory}) => {
    const [isAddType, setIsAddType] = useState(false)
    // let meses = Array.from({length: 12}).map((_, i) => new Date(0, i).toLocaleString("pt-BR", { month: "long" }))
    // meses = meses.map(mes => mes.charAt(0).toUpperCase() + mes.slice(1))
    // const dez = meses.slice(0, 1)
    // meses = meses.slice(1).concat(dez)

    // const hoje = new Date()
    // const mesAtual = hoje.toLocaleString("pt-BR", { month: "long" })

    return (
        <>
            <View style={{...styles.container, width: '100%'}}>
                {cat.tipos.map((item) => (
                    <DadoInput
                        key={item.id}
                        tipo={item}
                        categoryID={cat.id}
                    />
                ))}
                {isAddType &&
                    <EditCategory 
                        tipo={{ id: 0, nome: '', planejadoValue: '' }}
                        categoryID={cat.id}
                        setIsEditable={setIsAddType}
                        addType
                    />
                }
            </View>
            <Button action={() => setIsAddType(true)}>+ add type</Button>
        </>
    )
}

export default TiposPorCategoria
