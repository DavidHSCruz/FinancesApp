import { useDadosValue } from "@/context/dadosContext";
import { useThemeColors } from "@/hooks/useThemeColors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React, { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { styles } from "./styles";

type TabItemProps = {
  isFocused: boolean
  iconName: keyof typeof MaterialCommunityIcons.glyphMap
  onPress: () => void
  theme: any
};

function TabItem({ isFocused, iconName, onPress, theme }: TabItemProps) {
  // shared value e efeito para animar quando isFocused mudar
  const progress = useSharedValue(isFocused ? 1 : 0)

  useEffect(() => {
    progress.value = withTiming(isFocused ? 1 : 0, { duration: 300 })
  }, [isFocused, progress])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: progress.value }],
    opacity: progress.value,
  }))

  return (
    <TouchableOpacity onPress={onPress} style={styles.tab} activeOpacity={0.8}>
      <View style={styles.iconWrapper}>
        <Animated.View
          style={[styles.blueCircle, { backgroundColor: theme.action }, animatedStyle]}
        >
          <Animated.View
            style={[styles.circle, { backgroundColor: theme.surface }, animatedStyle]}
          />
        </Animated.View>
        <MaterialCommunityIcons
          style={{ top: isFocused ? -8 : 0 }}
          name={iconName}
          size={isFocused ? 45 : 32}
          color={isFocused ? theme.action : theme.background}
        />
      </View>
    </TouchableOpacity>
  );
}

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const theme = useThemeColors()
  const { intervalo, setIntervalo } = useDadosValue()

  const icons: Record<string, keyof typeof MaterialCommunityIcons.glyphMap> = {
    dashboard: "finance",
    categorias: "cube-scan",
    transacoes: "hand-coin-outline",
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.action }]}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          })
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }

          const hoje = new Date()
          const mesAtual = hoje.getMonth() + 1
          const anoAtual = hoje.getFullYear()
          if (route.name !== 'dashboard') {
            if (intervalo.nome === 'Mês') return

            setIntervalo({
              nome: "Mês",
              dataInicial: `01-${mesAtual}-${anoAtual}`,
              dataFinal: `31-${mesAtual}-${anoAtual}`
            })
          }else {
            if (intervalo.nome === 'Ano') return

            setIntervalo({
              nome: "Ano",
              dataInicial: `01-01-${anoAtual}`,
              dataFinal: `31-12-${anoAtual}`
            })
          }
        }

        return (
          <TabItem
            key={route.key}
            isFocused={isFocused}
            iconName={icons[route.name] ?? "circle"}
            onPress={onPress}
            theme={theme}
          />
        )
      })}
    </View>
  )
}

