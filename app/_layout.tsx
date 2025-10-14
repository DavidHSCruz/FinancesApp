import { colors } from "@/constants/colors"
import { DadosProvider } from "@/context/dadosContext"
import { Stack } from "expo-router"
import { StatusBar } from "react-native"
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaView } from "react-native-safe-area-context"

export default function RootLayout() {
  return (
    <DadosProvider>
      <GestureHandlerRootView>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
          <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="+not-found" />
          </Stack>
        </SafeAreaView>
      </GestureHandlerRootView>
    </DadosProvider>
  )
}
