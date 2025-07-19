import { colors } from "@/constants/colors";
import { IFinanceItem } from "@/types/Item";
import { FlatList, Text, TextInput, View } from "react-native";
import { styles } from "./styles";

interface dados {
    tipo: string
    items: IFinanceItem[]
}

interface DadoContainerProps {
    cor: string,
    dados: dados
}
export const DadoContainer = ({ cor, dados }: DadoContainerProps) => {
    const tabTitulos = [ ' ', 'Planejado', 'Real', 'Diferença' ]
    const larguraCol = 80

    const titulo = dados.tipo
    const values = dados.items

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
                    renderItem={ ({ item }) => {

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
                                onChange={() => {}}
                                value={item.nome}
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
                                value={item.value.toString()}
                            />
                            <Text style={[styles.informacoes,{width: larguraCol}]}>a</Text>
                            <Text style={[styles.informacoes,{width: larguraCol}]}>b</Text>
                        </View>
                        )
                    }
                    }
                />
            </View>
        </View>
    )
}
