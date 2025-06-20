import { colors } from "@/constants/colors"
import { Ionicons } from "@expo/vector-icons"
import { Tabs } from "expo-router"

export default function RootLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.secondary,
      tabBarShowLabel: false,
      headerStyle: {
        backgroundColor: colors.bg1,
      },
      headerShadowVisible: false,
      headerTintColor: colors.text,
      tabBarStyle: {
        backgroundColor: colors.bg1,
        borderColor: 'transparent',
      height: 60,
      },
     }}
     >
      <Tabs.Screen name="index" options={{ 
        title: "Resumo",
        headerShown: false,
        tabBarIcon: ({color}) => (
          <Ionicons
            name="book"
            size={24}
            color={color}
          />
        ),
      }} />
      <Tabs.Screen name="renda" options={{ 
        title: "Renda",
        tabBarIcon: ({color, focused}) => (
          <Ionicons
            name="wallet"
            size={24}
            color={ focused ? colors.renda : color }
          />
        )
      }} />
      <Tabs.Screen name="despesas" options={{ 
        title: "Despesas",
        tabBarIcon: ({color, focused}) => (
          <Ionicons
            name="card"
            size={24}
            color={ focused ? colors.despesa : color }
          />
        )
      }} />
      <Tabs.Screen name="investimentos" options={{ 
        title: "Investimentos",
        tabBarIcon: ({color, focused}) => (
          <Ionicons
            name="bar-chart"
            size={24}
            color={ focused ? colors.investimento : color }
          />
        )
      }} />
    </Tabs>
  )
}
