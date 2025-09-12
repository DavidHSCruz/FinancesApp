import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    gap: 25,
    height: 75,
    width: 300,
    alignSelf: "center",
    borderRadius: 37.5,
    marginBottom: 20,
    // sombra básica (iOS/Android)
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 3,
    elevation: 2,
  },
  tab: {
    flex: 1,
    alignItems: "center",
  },
  iconWrapper: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  blueCircle: {
    position: "absolute",
    marginBottom: 15,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  circle: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
  }
})