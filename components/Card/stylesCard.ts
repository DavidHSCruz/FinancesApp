import { colors } from "@/constants/colors"
import { Dimensions, StyleSheet } from "react-native"

const { width: w, height: h }= Dimensions.get("window")


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
    containerModalEdit: {
        width: w,
        height: h,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    ModalEdit: {
        width: '100%',
        height: 100,
        backgroundColor: '#0008',
        borderRadius: 5,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
})