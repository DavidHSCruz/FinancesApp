import { CustomTabBar } from "@/components/CustomTabBar"
import { Tabs } from "expo-router"

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="dashboard" options={{ title: "Dashboard" }} />
      <Tabs.Screen name="categorias" options={{ title: "Categorias" }} />
      <Tabs.Screen name="transacoes" options={{ title: "Transações" }} />
    </Tabs>
  )
}
