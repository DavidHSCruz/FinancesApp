import { colors } from "@/constants/colors"
import { DadosProvider } from "@/context/dadosContext"
import { Stack } from "expo-router"
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaView } from "react-native-safe-area-context"

export default function RootLayout() {
  return (
    <DadosProvider>
      <GestureHandlerRootView>
        <SafeAreaView style={{ flex: 1 }}>
          <Stack screenOptions={
            {
              statusBarBackgroundColor: colors.primary,
              statusBarStyle: 'light',
            }
          }>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
          </Stack>
        </SafeAreaView>
      </GestureHandlerRootView>
    </DadosProvider>
  )
}
