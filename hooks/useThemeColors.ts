import { useColorScheme } from "react-native"
import { colors } from "@/constants/colors"

export function useThemeColors() {
  const scheme = useColorScheme() // "light" | "dark"
  return colors[scheme ?? "light"]
}
