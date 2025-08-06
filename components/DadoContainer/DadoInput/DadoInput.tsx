import { colors } from "@/constants/colors";
import { useDadosValue } from "@/context/dadosContext";
import editCategoryType from "@/hooks/useEditCategoryType";
import { IFinanceCategoryType } from "@/types/category";
import { valorFormatadoBR, valorFormatadoDB } from "@/utils/formatacaoNumeros";
import { AntDesign } from '@expo/vector-icons';
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { styles } from "./styles";
import deleteCategoryType from "@/hooks/useDeleteCategoryType";

interface DadoContainerProps {
    tipo: IFinanceCategoryType,
    categoryID: number
}
export const DadoInput = ({ tipo, categoryID }: DadoContainerProps) => {
    const larguraCol = '23%'
    const {dados, setDados} = useDadosValue()
    const [itemValue, setItemValue] = useState<IFinanceCategoryType>(tipo)

    const itemDaCategoria = dados.items.filter(i => i.categoryID === categoryID).filter(t => t.tipoID === tipo.id)
    const valoresAcumulados = itemDaCategoria.reduce((acumulador, item) => {
        return acumulador + Number(item.value)
    }, 0)

    const valorPlanejado = Number(
        itemValue.planejadoValue
            .toString()
            .replace(/R\$\s*/g, '')
            .replace('.', '')
            .replace(',', '.')
    )
    const valorDiferenca = valorPlanejado - valoresAcumulados

    return (
        <View style={styles.informacaoContainer}>
            <TextInput 
                style={[
                    styles.informacoes,
                    styles.input,
                    {
                        borderColor: colors.placeholder,
                        width: larguraCol
                    }
                ]}
                placeholderTextColor={colors.placeholder} 
                placeholder=""
                onChange={e => setItemValue({...itemValue, nome: e.nativeEvent.text})}
                onBlur={() => editCategoryType(itemValue, dados, setDados, categoryID)}
                value={itemValue.nome}
            />
            <TextInput 
                style={[
                    styles.informacoes,
                    styles.input,
                    {
                        borderColor: colors.placeholder,
                        width: larguraCol
                    }
                ]}
                placeholderTextColor={colors.placeholder} 
                keyboardType="numeric"
                placeholder=""
                onChange={e => {
                    const valor = e.nativeEvent.text.replace(/[^0-9]/g, '')
                    let formatValue = valor
                                        .replace(/(\d{1,})(\d{2})$/, '$1,$2')
                                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                    
                    setItemValue({...itemValue, planejadoValue: formatValue })
                }}
                onBlur={e =>{
                    const valor = itemValue.planejadoValue.toString().replace(/R\$\s*/g, '')
                    let formatValueBR = valorFormatadoDB(valor)
                    formatValueBR = valorFormatadoBR(Number(formatValueBR))
                    
                    setItemValue({...itemValue, planejadoValue: formatValueBR})

                    editCategoryType(itemValue, dados, setDados, categoryID)
                }}
                value={itemValue.planejadoValue.toString()}
            />
            <Text style={[styles.informacoes,{width: larguraCol}]}>{valorFormatadoBR(valoresAcumulados)}</Text>
            <Text style={[
                styles.informacoes,
                {
                    width: larguraCol,
                    color: valorDiferenca < 0 ? colors.despesa : colors.renda
                }
            ]}>{valorFormatadoBR(valorDiferenca)}</Text>
            <View style={{paddingLeft:10}}>
                <Pressable onPress={() => deleteCategoryType(dados, setDados, tipo.id, categoryID)}>
                    <AntDesign name="close" size={10} color={colors.placeholder} />
                </Pressable>
            </View>
        </View>
    )
}
