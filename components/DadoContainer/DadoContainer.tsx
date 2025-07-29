import { colors } from "@/constants/colors";
import editCategory from "@/hooks/useEditCategory";
import { IFinanceCategory } from "@/types/category";
import { FlatList, Text, TextInput, View } from "react-native";
import { styles } from "./styles";
import { DadoInput } from "./DadoInput/DadoInput";

interface DadoContainerProps {
    cor: string,
    category: IFinanceCategory
}
export const DadoContainer = ({ cor, category }: DadoContainerProps) => {
    const tabTitulos = [ ' ', 'Planejado', 'Real', 'Diferença' ]
    const larguraCol = 80

    const titulo = category.nome
    const values = category.tipos

    return (
        <View style={styles.container}>
            <View style={[styles.tituloResumoContainer, {backgroundColor: cor}]}>
                <Text style={{color: colors.text}}>{titulo}</Text>
            </View>
            <View>
                <View style={styles.titulosContainer}>
                    {tabTitulos.map((titulo, index) => (
                        <Text key={index} style={[styles.titulos, {width: larguraCol}]}>
                            {titulo}
                        </Text>
                    ))}
                </View>
                <FlatList
                    data={values}
                    renderItem={ ({ item }) => (
                        <DadoInput
                            item={item}
                            categoryID={category.id}
                        />
                    )
                    }
                />
            </View>
        </View>
    )
}
