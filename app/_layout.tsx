import { DadosProvider } from "@/context/dadosContext"
import { useThemeColors } from "@/hooks/useThemeColors"
import { Stack } from "expo-router"
import { StatusBar } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"

export default function RootLayout() {

  const theme = useThemeColors()
  return (
    <DadosProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          {/* Barra de status com cor do tema */}
          <StatusBar backgroundColor={theme.action} barStyle="light-content" />
          
          {/* Stack principal do app */}
          <Stack screenOptions={{ headerShown: false }}>
            {/* Grupo de tabs */}
            <Stack.Screen name="(tabs)" />
            
            {/* Tela de erro 404 */}
            <Stack.Screen name="+not-found" />
          </Stack>
        </SafeAreaView>
      </GestureHandlerRootView>
    </DadosProvider>
  )
}
