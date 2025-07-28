import { colors } from "@/constants/colors";
import { Dimensions, StyleSheet } from "react-native";

const { width: w }= Dimensions.get("window")

export const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    color: colors.text,
    paddingHorizontal: 10,
    marginRight: 10
  },
  picker: {
    borderBottomWidth: 1,
    width: w/2
  },
  containerBG: {
    padding: 20,
    height: "100%",
    backgroundColor: colors.bg1,
  },
  title: {
    color: colors.text,
    padding: 20,
    fontSize: 24,
    fontWeight: "bold",
  },
  addButton: {
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: colors.text,
  },
})
