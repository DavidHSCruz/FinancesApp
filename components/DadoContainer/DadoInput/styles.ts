import { colors } from "@/constants/colors"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    informacaoContainer: {
        flexDirection: 'row',
        width: '100%',
        gap: 10,
        justifyContent: 'space-between',
    },
    informacoes: {
        paddingHorizontal:10, 
        paddingVertical: 3, 
        color: colors.text, 
        fontSize: 12, 
        textAlign: 'center',
    },
    input: {
        borderBottomWidth: 1,
        color: colors.text,
    }
})