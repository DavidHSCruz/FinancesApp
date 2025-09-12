import { useThemeColors } from "@/hooks/useThemeColors"
import { styles } from "@/styles/dashboard"
import { valorFormatadoBR } from "@/utils/formatacaoNumeros"
import { useEffect, useMemo, useState } from "react"
import { SafeAreaView, ScrollView, Text, View } from "react-native"


import DonutChart from "@/components/GraficoDonut/DonutChart"
import { IntervalSelector } from "@/components/IntervalSelector/IntervalSelector"
import { useDadosValue } from "@/context/dadosContext"
import { IFinanceCategory } from "@/types/category"
import { carregarDadosStorage } from "@/utils/carregaDados"

export default function Home() {
  const theme = useThemeColors()
  const { dados, setDados } = useDadosValue()

  // ESSE USE EFFECT É PARA CARREGAR OS DADOS INICIAIS SE CASO PERDIDOS
  // useEffect(() => {
  //   AsyncStorage.setItem('@finance:items', JSON.stringify([
  //     {
  //       id: 1,
  //       date: "2025-07-24",
  //       nome: "Salário",
  //       value: 3500,
  //       categoryID: 1,
  //       tipoID: 1
  //     },
  //     {
  //       id: 2,
  //       date: "2025-07-24",
  //       nome: "Aluguel",
  //       value: 1200,
  //       categoryID: 2,
  //       tipoID: 1
  //     },
  //     {
  //       id: 3,
  //       date: "2025-07-24",
  //       nome: "Compra de ações",
  //       value: 500,
  //       categoryID: 3,
  //       tipoID: 1
  //     }
  //   ]))
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

  const [categoriasSemRenda, setCategoriasSemRenda] = useState<IFinanceCategory[]>([])

  const ano = new Date().getFullYear()
  const [intervalo, setIntervalo] = useState({
    nome: "Ano",
    dataInicial: `01-01-${ano}`,
    dataFinal: `31-12-${ano}`
  })

  
  useEffect(() => {
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
    carregarDados()
  }, [setDados])

  const totais = useMemo(() => {
    if (!dados.items || !dados.categories) return

    let totalRenda = 0
    let totalDespesa = 0
    let totalInvestimento = 0
    let totalSaldo = 0

    dados.items.forEach(item => {
      if (item.tipoID && item.categoryID) {
        const categoria = dados.categories.find(c => c.id === item.categoryID)
        if (!categoria) return

        const valor = Number(item.value) || 0

        if (categoria.nome === "renda") totalRenda += valor
        if (categoria.nome === "despesa") totalDespesa += valor
        if (categoria.nome === "investimento") totalInvestimento += valor
      }
    })
    totalSaldo = totalRenda - (totalDespesa + totalInvestimento)
    
    return { totalRenda, totalDespesa, totalInvestimento, totalSaldo }

  }, [dados])

  const dadosGrafico = useMemo(() => {
    if (!dados.items || !dados.categories) return

    const { totalRenda = 0, totalDespesa = 0, totalInvestimento = 0 } = totais || {}

    return [
      { name: "Renda", value: totalRenda, valueReais: valorFormatadoBR(totalRenda), color: theme.renda },
      { name: "Despesas", value: totalDespesa, valueReais: valorFormatadoBR(totalDespesa), color: theme.despesa },
      { name: "Investimentos", value: totalInvestimento, valueReais: valorFormatadoBR(totalInvestimento), color: theme.investimento }
    ]
  }, [dados, theme, totais])
  

  return (
    <SafeAreaView style={{ ...styles.container, backgroundColor: theme.background }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>
        <View style={{ ...styles.containerSaldo, backgroundColor: theme.action }}>
          <Text style={{ ...styles.saldo, color: theme.background }}>
            {`Saldo = ${valorFormatadoBR(totais?.totalSaldo || 0)}`}
          </Text>
        </View>

        <View style={{ marginTop: -40, alignItems: "center" }}>
          <View style={styles.containerResumo}>
            <View style={{ ...styles.containerGrafico, backgroundColor: theme.surface }}>
              <View style={{ ...styles.titulosContainer, borderBottomColor: theme.placeholder }}>
                <Text style={{ ...styles.titulo, color: theme.textPrimary }}>Resumo</Text>
              </View>

              <IntervalSelector intervalo={intervalo} setIntervalo={setIntervalo} />

              <DonutChart data={dadosGrafico || []}>
                {valorFormatadoBR(totais?.totalSaldo || 0)}
              </DonutChart>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
