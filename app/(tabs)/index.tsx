import DonutChart from "@/components/GraficoDonut/DonutChart"
import { MenuAddButton } from "@/components/MenuAddButton/MenuAddButton"
import { colors } from "@/constants/colors"
import { IFinanceItem } from "@/types/Item"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"
import { InteractionManager, StyleSheet, Text, View } from "react-native"
interface DataItem {
  tipo: string
  items: IFinanceItem[]
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
      <View style={styles.containerSaldo}>
        <Text style={styles.saldo}>{`Saldo = ${formatarBRL(saldo)}`}</Text>
        <View style={{position: 'relative', width: '100%', alignItems: 'center'}}>
          <View style={styles.containerResumo}>
            <DonutChart data={dados}/>
          </View>
        </View>
      </View>
      <MenuAddButton onPress={() => setIsModalAddHidden(!isModalAddHidden)} hiddenModal={isModalAddHidden} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg1,
  },
  containerSaldo: {
    backgroundColor: colors.primary,
    height: 120,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
  },
  saldo: {
    color: colors.text,
    paddingBottom: 20,
    paddingTop: 30,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  containerResumo: {
    backgroundColor: colors.bg1,
    position: "absolute",
    padding: 20,
    borderRadius: 20,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 2px 15px rgba(0, 0, 0, 0.30)",
  }
})
