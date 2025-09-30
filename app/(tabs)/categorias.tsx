import { useThemeColors } from "@/hooks/useThemeColors"
import { styles } from "@/styles/categories"
import { ScrollView, Text, View } from "react-native"


import TiposPorCategoria from "@/components/TiposPorCategoria/TiposPorCategoria"
import { useDadosValue } from "@/context/dadosContext"

export default function Categories() {
  const theme = useThemeColors()
  const { dados, setDados } = useDadosValue()

  const usedCategories = dados.categories.filter((cat) => cat.nome !== 'renda')

  //editar cor, titulo e tipos

  return (
    <>
      <View style={{ ...styles.bgSaldo, backgroundColor: theme.action}} />
      <View style={{ ...styles.containerSaldo, backgroundColor: theme.action}}>
        <Text style={{ ...styles.saldo, color: theme.background }}>
          {`Texto`}
        </Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 200, marginTop: 70 }}>
        <View style={{ marginHorizontal: 'auto', gap: 20, width: '90%' }}>
          <TiposPorCategoria usedCategories={usedCategories} />
        </View>
      </ScrollView>
    </>
  )
}
