import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        alignItems: 'center', 
        width: '100%', 
        paddingBottom: 20
    },
    filtro: {
        padding: 5,
        borderRadius: 5
    },
    filtroSelected: {
        borderBottomWidth: 1,
    },
    filtroContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        width: '100%' 
    }
})
