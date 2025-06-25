import { colors } from "@/constants/colors"
import { StyleSheet } from "react-native"


export const styles = StyleSheet.create({
    swipeable: {
        height: 40,
        marginVertical: 5,
        borderRadius: 5,
        justifyContent: "center",
    },
    item: {
        height: 40,
        width: "100%",
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    itemText: {
        color: colors.text,
    },
    containerActions: {
        flexDirection: "row",
        width: 80,
        height: "100%",
    },
    action: {
        flex: 1,
        width: 80,
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
    },
})