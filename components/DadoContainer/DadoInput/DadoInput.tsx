import { colors } from "@/constants/colors";
import { useDadosValue } from "@/context/dadosContext";
import editCategory from "@/hooks/useEditCategory";
import { IFinanceCategoryType } from "@/types/category";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { styles } from "./styles";
import { valorFormatadoDB } from "@/utils/formatacaoNumeros";

interface DadoContainerProps {
    item: IFinanceCategoryType,
    categoryID: number
}
export const DadoInput = ({ item, categoryID }: DadoContainerProps) => {
    const larguraCol = 80
    const [itemValue, setItemValue] = useState<IFinanceCategoryType>(item)

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
                onChange={e => setItemValue({...itemValue, nome: e.nativeEvent.text})}
                onBlur={() => editCategory(itemValue, dados, setDados, categoryID)}
                value={itemValue.nome}
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
                onChange={e => setItemValue({...itemValue, planejadoValue: valorFormatadoDB(e.nativeEvent.text)})}
                onBlur={() => editCategory(itemValue, dados, setDados, categoryID)}
                value={itemValue.planejadoValue?.toString()}
            />
            <Text style={[styles.informacoes,{width: larguraCol}]}>a</Text>
            <Text style={[styles.informacoes,{width: larguraCol}]}>b</Text>
        </View>
    )
}
