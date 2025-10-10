import { IFinanceCategory } from '@/types/category'
import { useState } from 'react'
import { View } from 'react-native'
import Button from '../Button/Button'
import { DadoInput } from '../DadoInput/DadoInput'
import EditCategory from '../EditCategory/EditCategory'
import { styles } from './styles'

const TiposPorCategoria = ({cat}: {cat: IFinanceCategory}) => {
    const [isAddType, setIsAddType] = useState(false)
    
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
                        tipo={{ id: 0, data: '', nome: '', planejadoValue: '' }}
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
