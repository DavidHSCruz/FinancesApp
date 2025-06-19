import DonutChart from "@/components/GraficoDonut/DonutChart"
import { MenuAddButton } from "@/components/MenuAddButton/MenuAddButton"
import { colors } from "@/constants/colors"
import { IFinanceItem } from "@/types/Item"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"
import { Dimensions, InteractionManager, StyleSheet, Text, View } from "react-native"
interface DataItem {
  tipo: string;
  items: IFinanceItem[];
}

const CHAVES_STORAGE = {
  RENDA: '@finance:items:renda',
  DESPESAS: '@finance:items:despesas',
  INVESTIMENTOS: '@finance:items:investimentos'
} as const

const carregarItensStorage = async (chaves: string[]) => {
  const itensArmazenados = await AsyncStorage.multiGet(chaves)
  return itensArmazenados.map(([chave, valor]) => ({
    tipo: chave.replace('@finance:items:', ''),
    items: JSON.parse(valor || '[]')
  }))
}

const formatarDados = (itens: DataItem[]): Record<string, IFinanceItem[]> => {
  return itens.reduce((acumulador, item) => ({
    ...acumulador,
    [item.tipo]: item.items
  }), {})
}

export default function Index() {
  const [isModalAddHidden, setIsModalAddHidden] = useState(true)
  const [items, setItems] = useState<Record<string, IFinanceItem[]>>({})
  const screenWidth = Dimensions.get('window').width
  
  useEffect(() => {
  const carregarItens = async () => {
    try {
      const chavesStorage = Object.values(CHAVES_STORAGE)
      const itensCarregados = await carregarItensStorage(chavesStorage)
      const dadosFormatados = formatarDados(itensCarregados)
      
      InteractionManager.runAfterInteractions(() => {
        setItems(dadosFormatados)
      })
    } catch (erro) {
      console.error('Erro ao carregar itens:', erro)
    }
  }

  carregarItens()
}, [])

const CORES_POR_TIPO = {
  renda: colors.renda,
  investimentos: colors.investimento,
  despesas: colors.despesa
} as const

const calcularSomaPorTipo = (items: IFinanceItem[]) => {
  const valor =  items?.reduce((total, item) => total + parseFloat(item.value.toString()), 0) ?? 0
  return valor
}

const calcularSaldo = (items: Record<string, IFinanceItem[]>) => {
    const renda = calcularSomaPorTipo(items['renda'] || [])
    const despesas = calcularSomaPorTipo(items['despesas'] || [])
    const investimentos = calcularSomaPorTipo(items['investimentos'] || [])
    return renda - despesas - investimentos
  }

function formatarBRL(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const formatarDadosGrafico = (items: Record<string, IFinanceItem[]>) => {
  return Object.entries(items).map(([tipo, itens]) => ({
    name: tipo,
    value: calcularSomaPorTipo(itens),
    valueReais: formatarBRL(calcularSomaPorTipo(itens)),
    color: CORES_POR_TIPO[tipo as keyof typeof CORES_POR_TIPO],
  }))
}

const dados = formatarDadosGrafico(items)
const saldo = calcularSaldo(items)

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>{`Saldo = ${formatarBRL(saldo)}`}</Text>
      </View>
      <DonutChart data={dados}/>
      <MenuAddButton onPress={() => setIsModalAddHidden(!isModalAddHidden)} hiddenModal={isModalAddHidden} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colors.text,
    padding: 20,
  }
})
