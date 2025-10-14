import { useDadosValue } from '@/context/dadosContext'
import { IFinanceCategory } from '@/types/category'
import { useState } from 'react'
import { View } from 'react-native'
import Button from '../Button/Button'
import { DadoInput } from '../DadoInput/DadoInput'
import EditCategory from '../EditCategory/EditCategory'
import { styles } from './styles'

const TiposPorCategoria = ({cat}: {cat: IFinanceCategory}) => {
    const [isAddType, setIsAddType] = useState(false)
    const { intervalo } = useDadosValue()

    const mes = intervalo.dataFinal.split('-')[1]
    const ano = intervalo.dataFinal.split('-')[2]
    const data = `${ano}-${mes}`

    const tiposPorData = cat.tipos?.filter(t => t.informacoes.find(d => d.data === data))
    
    return (
        <>
            <View style={{...styles.container, width: '100%'}}>
                {tiposPorData?.map((item) => (
                    <DadoInput
                        key={item.id}
                        tipo={item}
                        categoryID={cat.id}
                    />
                ))}
                {isAddType &&
                    <EditCategory 
                        tipo={
                            {
                                id: 0,
                                nome: '',
                                informacoes: [
                                    {
                                        data: '',
                                        planejadoValue: ''
                                    }
                                ]
                            }
                        }
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
