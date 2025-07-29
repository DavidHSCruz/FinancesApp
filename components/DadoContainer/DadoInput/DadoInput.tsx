import { colors } from "@/constants/colors";
import { useDadosValue } from "@/context/dadosContext";
import editCategory from "@/hooks/useEditCategory";
import { IFinanceCategoryType } from "@/types/category";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { styles } from "./styles";

interface DadoContainerProps {
    item: IFinanceCategoryType,
    categoryID: number
}
export const DadoInput = ({ item, categoryID }: DadoContainerProps) => {
    const larguraCol = 80
    const [itemValue, setItemValue] = useState<string>(item.nome || '')

    const {dados, setDados} = useDadosValue()

    return (
        <View style={styles.informacaoContainer}>
            <TextInput 
                style={[
                    styles.informacoes,
                    styles.input,
                    {
                        borderColor: '#faf',
                        width: larguraCol
                    }
                ]}
                placeholderTextColor={colors.placeholder} 
                placeholder=""
                onChange={e => setItemValue(e.nativeEvent.text)}
                onBlur={() => editCategory(item, dados, setDados, categoryID)}
                value={itemValue}
            />
            <TextInput 
                style={[
                    styles.informacoes,
                    styles.input,
                    {
                        borderColor: '#faf',
                        width: larguraCol
                    }
                ]}
                placeholderTextColor={colors.placeholder} 
                keyboardType="numeric"
                placeholder=""
                onChange={() => {}} 
                value={item.planejadoValue?.toString() || ''}
            />
            <Text style={[styles.informacoes,{width: larguraCol}]}>a</Text>
            <Text style={[styles.informacoes,{width: larguraCol}]}>b</Text>
        </View>
    )
}
