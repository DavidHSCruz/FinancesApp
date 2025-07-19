import { DadoContainer } from "@/components/DadoContainer/DadoContainer"
import DonutChart from "@/components/GraficoDonut/DonutChart"
import { MenuAddButton } from "@/components/MenuAddButton/MenuAddButton"
import { colors } from "@/constants/colors"
import { useDadosValue } from "@/context/dadosContext"
import { IFinanceItem } from "@/types/Item"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"
import { InteractionManager, StyleSheet, Text, View } from "react-native"
interface DataItem {
  tipo: string
  items: IFinanceItem[]
}

const CHAVES_STORAGE = {
  ITEMS: '@finance:items',
  CATEGORIES: '@finance:categories',
} as const

const carregarItensStorage = async (chaves: string[]) => {
  const itensArmazenados = await AsyncStorage.multiGet(chaves)
  return itensArmazenados.map(([chave, valor]) => (
    valor ? JSON.parse(valor) : null
  ))
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
  const dadosContext = useDadosValue()
  if (!dadosContext) throw new Error('useDadosValue must be used within a DadosProvider')
  const { dados, setDados } = dadosContext

  useEffect(() => {
  const carregarItens = async () => {
    try {
      const chavesStorage = Object.values(CHAVES_STORAGE)
      const itensCarregados = await carregarItensStorage(chavesStorage)
      const dadosFormatados = formatarDados(itensCarregados)
      
      InteractionManager.runAfterInteractions(() => {
        //setItems(dadosFormatados)

        const [ items, categories ] = itensCarregados
        setDados({
          items: items.items || [], 
          categories: categories.categories || []
        })
        console.log(JSON.stringify(dados, null, 2))
      })
    } catch (erro) {
      console.error('Erro ao carregar itens:', erro)
    }
  }

  carregarItens()
}, [])

const CORES_POR_TIPO = {
  renda: colors.renda,
  investimento: colors.investimento,
  despesa: colors.despesa
} as const

const calcularSomaPorTipo = (items: IFinanceItem[]) => {
  const valor =  items?.reduce((total, item) => total + parseFloat(item.value.toString()), 0) ?? 0
  return valor
}

const calcularSaldo = (items: Record<string, IFinanceItem[]>) => {
    const renda = calcularSomaPorTipo(items['renda'] || [])
    const despesa = calcularSomaPorTipo(items['despesa'] || [])
    const investimento = calcularSomaPorTipo(items['investimento'] || [])
    return renda - despesa - investimento
  }

function formatarBRL(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const formatarDadosGrafico = (items: Record<string, IFinanceItem[]>) => {
  const valoresUtilizados = Object.entries(items).filter(([tipo]) => tipo !== 'renda')
  return valoresUtilizados.map(([tipo, itens]) => ({
    name: tipo,
    value: calcularSomaPorTipo(itens),
    valueReais: formatarBRL(calcularSomaPorTipo(itens)),
    color: CORES_POR_TIPO[tipo as keyof typeof CORES_POR_TIPO],
  }))
}

const db = formatarDadosGrafico(items)
const saldo = calcularSaldo(items)

const dadosContainer = [
  {
    tipo: 'despesas',
    items: items['despesa'] || []
  },
  {
    tipo: 'investimentos',
    items: items['investimento'] || []
  }
]

  return (
    <View style={styles.container}>
      <View style={styles.containerSaldo}>
        <Text style={styles.saldo}>{`Saldo = ${formatarBRL(saldo)}`}</Text>
        <View style={{position: 'relative', width: '100%', alignItems: 'center'}}>
          <View style={styles.containerResumo}>
            <View style={styles.containerGrafico}>
              <DonutChart data={db}>
                {formatarBRL(saldo)}
              </DonutChart>
            </View>
            <DadoContainer dados={dadosContainer[1]} cor={colors.investimento} />
            <DadoContainer dados={dadosContainer[0]} cor={colors.despesa} />
          </View>
        </View>
      </View>
      <MenuAddButton 
        onPress={() => setIsModalAddHidden(!isModalAddHidden)} 
        hiddenModal={isModalAddHidden} 
      />
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
  containerGrafico: {
    backgroundColor: colors.bg2,
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  containerResumo: {
    position: "absolute",
    width: "90%",
    gap: 20,
    
  }
})
