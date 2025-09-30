import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    informacaoContainer: {
        flexDirection: 'row',
        alignItems:'center'
    },
    informacoes: {
        paddingVertical: 3,
        fontSize: 10, 
        marginLeft: '2%',
        textAlign: 'right',
    },
    input: {
        borderBottomWidth: 1
    },
    barraBg: {
        position: 'absolute',
        height: 20,
        justifyContent: 'center',
        width: '100%'
    },
    menu: {
        padding: 10,
        position: 'absolute',
        right: 25,
        top: 5,
        borderRadius: 5,
        gap: 10,
        zIndex: 1
    }
})