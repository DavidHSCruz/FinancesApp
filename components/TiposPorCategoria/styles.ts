import { colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    text: {
        color: colors.text,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        padding: 20,
    }
})
