import { colors } from "@/constants/colors"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    informacaoContainer: {
        flexDirection: 'row',
        alignItems:'center'
    },
    informacoes: {
        paddingVertical: 3, 
        color: colors.text, 
        fontSize: 10, 
        marginLeft: '2%',
        textAlign: 'right',
    },
    input: {
        borderBottomWidth: 1,
        color: colors.text,
    }
})