import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  bgSaldo: {
    height: 120,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
    position: 'absolute',
    width: '100%',
    zIndex: -1
  },
  containerSaldo: {
    position: 'absolute',
    width: '100%',
    zIndex: 1
  },
  saldo: {
    paddingBottom: 10,
    paddingTop: 30,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  }
})