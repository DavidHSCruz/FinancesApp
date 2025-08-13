import { colors } from '@/constants/colors'
import { useDadosValue } from '@/context/dadosContext'
import addCategoryType from '@/hooks/useAddCategoryType'
import { IFinanceCategory } from '@/types/category'
import { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

interface MenuAddProps {
    action: () => void
}

export const MenuAdd = ({ action }: MenuAddProps) => {
    const {dados, setDados} = useDadosValue()
    const [listaDeCategoriasSemRenda, setListaDeCategoriasSemRenda] = useState<IFinanceCategory[]>([] as IFinanceCategory[])
    useEffect(() => {
        if(dados.categories) {
            setListaDeCategoriasSemRenda(dados.categories.filter(cat => cat.nome !== 'renda'))
        }
    }, [dados])

    return (
        <>
            <Pressable style={styles.containerBlur} onPress={action} />
            <View style={styles.container}>
                {listaDeCategoriasSemRenda.map((cat, index) => {
                    const nomeFormatado = cat.nome.charAt(0).toUpperCase() + cat.nome.slice(1).toLowerCase()
                    return(
                        <Pressable 
                            key={index} 
                            style={styles.button}
                            onPress={() => {
                                const categoriaID = dados.categories.filter(cat => cat.nome === nomeFormatado.toLowerCase())[0].id
                                action()
                                addCategoryType(dados, setDados, categoriaID)
                        }}>
                            <Text style={styles.text}>{'Tipo de ' + nomeFormatado}</Text>
                        </Pressable>
                    )
                })}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        paddingVertical: 10,
        paddingHorizontal: 20,
        bottom: 100,
        right: 100,
        borderRadius: 5,
        backgroundColor: colors.bg2,
    },
    containerBlur: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        backgroundColor: colors.bg2,
        opacity: 0.75,
    },
    button:{
        padding: 20,
    },
    text: {
        color: colors.text,
    }
})

