import { colors } from "@/constants/colors"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg1,
  },
  containerSaldo: {
    backgroundColor: colors.primary,
    height: 120,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
  },
  saldo: {
    color: colors.text,
    paddingBottom: 20,
    paddingTop: 30,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  containerGrafico: {
    backgroundColor: colors.bg2,
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  text: {
    color:colors.text
  },
  containerResumo: {
    width: "90%",
    gap: 20,
  }
})