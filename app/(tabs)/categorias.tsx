import { useThemeColors } from "@/hooks/useThemeColors"
import { styles } from "@/styles/categories"
import { ScrollView, Text, View } from "react-native"


import SurfaceContainer from "@/components/SurfaceContainer/SurfaceContainer"
import TiposPorCategoria from "@/components/TiposPorCategoria/TiposPorCategoria"
import { useDadosValue } from "@/context/dadosContext"

export default function Categories() {
  const theme = useThemeColors()
  const { dados } = useDadosValue()

  const usedCategories = dados.categories.filter((cat) => cat.nome !== 'renda')

  const cor = (name: string) => {
      if (name === 'despesa') return theme.despesa
      if (name === 'investimento') return theme.investimento
      if (name === 'renda') return theme.renda
      return theme.placeholder
  }

  return (
    <>
      <View style={{ ...styles.bgSaldo, backgroundColor: theme.action}} />
      <View style={{ ...styles.containerSaldo, backgroundColor: theme.action}}>
        <Text style={{ ...styles.saldo, color: theme.background }}>Categorias</Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 200, marginTop: 70 }}>
        <View style={{ marginHorizontal: 'auto', gap: 20, width: '90%' }}>
          {usedCategories.map(cat => (
            <SurfaceContainer key={cat.id} titulo={cat.nome} cor={cor(cat.nome)} >
              <TiposPorCategoria cat={cat} />
            </SurfaceContainer>
          ))}
        </View>
      </ScrollView>
    </>
  )
}
