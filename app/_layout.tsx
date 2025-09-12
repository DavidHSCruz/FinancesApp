import { DadosProvider } from "@/context/dadosContext"
import { useThemeColors } from "@/hooks/useThemeColors"
import { Stack } from "expo-router"
import { StatusBar } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

export default function RootLayout() {

  const theme = useThemeColors()
  return (
    <DadosProvider>
      <SafeAreaProvider>
        <GestureHandlerRootView>
          <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>

            <StatusBar backgroundColor={theme.action} barStyle="light-content" />
            
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="+not-found" />
            </Stack>
          </SafeAreaView>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </DadosProvider>
  )
}
