import { colors } from "@/constants/colors"
import { Stack } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack screenOptions={
        {
          statusBarBackgroundColor: colors.bg1,
        }
      }>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
      </Stack>
    </SafeAreaView>
  )
}
