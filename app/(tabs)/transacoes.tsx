import { useThemeColors } from "@/hooks/useThemeColors"
import { Text, View } from "react-native"

export default function Home() {
  const theme = useThemeColors()

  return (
    <View style={{ flex: 1, backgroundColor: theme.background, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: theme.textPrimary, fontSize: 20 }}>Tela Perfil</Text>
    </View>
  )
}
