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
  },
  containerSurface: {
    padding: 20,
    width: '90%',
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  titulosContainer: {
    width: '100%', 
    marginBottom: 10, 
    borderBottomWidth: .5,
  }
})