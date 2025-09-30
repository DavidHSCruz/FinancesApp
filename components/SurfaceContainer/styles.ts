import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  containerSurface: {
    padding: 20,
    width: '100%',
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, 
    borderBottomWidth: .5,
  }
})