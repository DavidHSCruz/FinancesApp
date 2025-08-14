import { colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row', 
        justifyContent: 'space-between',
        width: '100%',
    },
    filtro: {
        padding: 5,
        borderRadius: 5
    },
    filtroSelected: {
        borderBottomWidth: 1,
        borderColor:colors.text
    },
    text: {
        color:colors.text,
    },
})
