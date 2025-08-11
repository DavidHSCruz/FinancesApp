import { DadoContainer } from "@/components/DadoContainer/DadoContainer"
import DonutChart from "@/components/GraficoDonut/DonutChart"
import { IntervalSelector } from "@/components/IntervalSelector/IntervalSelector"
import { MenuAddButton } from "@/components/MenuAddButton/MenuAddButton"
import { colors } from "@/constants/colors"
import { useDadosValue } from "@/context/dadosContext"
import { IFinanceCategory } from "@/types/category"
import { IDados } from "@/types/dados"
import { IFinanceItem } from "@/types/Item"
import { carregarDadosStorage } from "@/utils/carregaDados"
import { useEffect, useState } from "react"
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"
interface DataItem {
  tipo: string
  items: IFinanceItem[]
}

export default function Index() {
  const { dados, setDados } = useDadosValue()

// ESSE USE EFFECT É PARA CARREGAR OS DADOS INICIAIS SE CASO PERDIDOS
// useEffect(() => {
//   // AsyncStorage.setItem('@finance:items', JSON.stringify([
//   //   {
//   //     id: 1,
//   //     date: "2025-07-24",
//   //     nome: "Salário",
//   //     value: 3500,
//   //     categoryID: 1,
//   //     tipoID: 1
//   //   },
//   //   {
//   //     id: 2,
//   //     date: "2025-07-24",
//   //     nome: "Aluguel",
//   //     value: 1200,
//   //     categoryID: 2,
//   //     tipoID: 1
//   //   },
//   //   {
//   //     id: 3,
//   //     date: "2025-07-24",
//   //     nome: "Compra de ações",
//   //     value: 500,
//   //     categoryID: 3,
//   //     tipoID: 1
//   //   }
//   // ]))
//   AsyncStorage.setItem('@finance:categories', JSON.stringify([
//     {
//       id: 1,
//       nome: "renda",
//       tipos: [
//         {
//           id: 1,
//           nome: "Salário"
//         },
//         {
//           id: 2,
//           nome: "Freelance"
//         }
//       ]
//     },
//     {
//       id: 2,
//       nome: "despesa",
//       tipos: [
//         {
//           id: 1,
//           nome: "Aluguel",
//           planejadoValue: "R$ 1.389,55"
//         },
//         {
//           id: 2,
//           nome: "Supermercado",
//           planejadoValue: "R$ 905,00"
//         }
//       ]
//     },
//     {
//       id: 3,
//       nome: "investimento",
//       tipos: [
//         {
//           id: 1,
//           nome: "Ações",
//           planejadoValue: ""
//         },
//         {
//           id: 2,
//           nome: "Fundos Imobiliários",
//           planejadoValue: "0,00"
//         }
//       ]
//     }
//   ]))
// }, [])

const CHAVES_STORAGE = {
  ITEMS: '@finance:items',
  CATEGORIES: '@finance:categories',
} as const

async function carregarDados() {
    const valoresStorage = Object.values(CHAVES_STORAGE)
    const itensCarregados = await carregarDadosStorage(valoresStorage)
    const [ items, categories ] = itensCarregados
    setDados({
        items: items || [],
        categories: categories || []
    })
}

useEffect(() => {
  carregarDados()
}, [])

const CORES_POR_TIPO = {
  renda: colors.renda,
  investimento: colors.investimento,
  despesa: colors.despesa
} as const

const calcularSaldo = (dados: any) => {
  const { renda, investimento, despesa } = dados

  return renda - (despesa + investimento)
}

function formatarBRL(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function somarValores (itens: DataItem[]): Record<string, IFinanceItem[]> {
  return itens.reduce((acumulador, item) => {
    const somaValores = item.items.reduce((total, item) => total + parseFloat(item.value.toString()), 0)
    return {
      ...acumulador,
      [item.tipo]: somaValores
    }
  }, {})
}

function separaItemsPorCategory(items: IFinanceItem[]): DataItem[] {
  const categories = dados.categories

  return categories.map(category => ({
    tipo: category.nome,
    items: items.filter(item => item.categoryID === category.id)
  }))
}

function selecionaDadosInvestimentosDespesas(dados: IDados) {
  const idDaRenda = dados.categories.find(category => category.nome === 'renda')?.id
  
  return dados.items.filter(item => item.categoryID !== idDaRenda)
}

function formatarDadosGrafico(dados: IDados) {
  const itemsGrafico = selecionaDadosInvestimentosDespesas(dados)
  const itemsPorTipo = separaItemsPorCategory(itemsGrafico)
  const valorPorTipo = somarValores(itemsPorTipo)

  return Object.entries(valorPorTipo).map(([tipo, valor]) => ({
    name: tipo,
    value: valor,
    valueReais: formatarBRL(Number(valor)),
    color: CORES_POR_TIPO[tipo as keyof typeof CORES_POR_TIPO],
  }))
}

const [dadosGrafico, setDadosGrafico] = useState<any>([])
const [saldo, setSaldo] = useState(0)
const [categoriasSemRenda, setCategoriasSemRenda] = useState<IFinanceCategory[]>([] as IFinanceCategory[])
const [intervalo, setIntervalo] = useState('Mês')
useEffect(() => {
  if (dados.items && dados.items.length > 0 && dados.categories && dados.categories.length > 0) {
    setDadosGrafico(formatarDadosGrafico(dados))
    setSaldo(() => {
      const itemsPorTipo = separaItemsPorCategory(dados.items)
      const valorPorTipo = somarValores(itemsPorTipo)

      return calcularSaldo(valorPorTipo)
    })
    setCategoriasSemRenda(() => {
      const rendaID = dados.categories.find(category => category.nome === 'renda')?.id
      const categoriasUtilizadas = dados.categories.filter(category => category.id !== rendaID)
      
      return categoriasUtilizadas
    })
  }
}, [dados])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>
        <View style={styles.containerSaldo}>
          <Text style={styles.saldo}>{`Saldo = ${formatarBRL(saldo)}`}</Text>
        </View>
        <View style={{marginTop: -40, alignItems: 'center'}}>
          <View style={styles.containerResumo}>
            <View style={styles.containerGrafico}>
              <IntervalSelector intervalo={intervalo} setIntervalo={setIntervalo}/>
              <DonutChart data={dadosGrafico}>
                {formatarBRL(saldo)}
              </DonutChart> 
            </View>
            {categoriasSemRenda.map((category, index) => (
                <DadoContainer 
                  key={index} 
                  category={category} 
                  cor={CORES_POR_TIPO[category.nome as keyof typeof CORES_POR_TIPO]} />
              ))
            }
          </View>
        </View>
      </ScrollView>
      <MenuAddButton />
    </SafeAreaView>
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
  text: {
    color:colors.text
  },
  containerResumo: {
    width: "90%",
    gap: 20,
  }
})
