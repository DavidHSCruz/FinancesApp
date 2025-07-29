import { colors } from "@/constants/colors"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 10,
        flex: 1,
        backgroundColor: colors.bg2,
        borderRadius: 20,
        alignItems: "center",
        gap: 10,
        
        elevation: 8,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    tituloResumoContainer: {
        width: "100%",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    titulosContainer: {
        flexDirection: 'row',
        width: '100%', 
        justifyContent: 'space-between',
    },
    titulos: {
        paddingHorizontal:10, 
        paddingVertical: 3, 
        color: colors.text, 
        fontSize: 13,
        fontWeight: 'bold',
        textAlign: 'center',
    }
})