import { useThemeColors } from "@/hooks/useThemeColors"
import { styles } from "@/styles/dashboard"
import { valorFormatadoBR } from "@/utils/formatacaoNumeros"
import { useEffect, useMemo, useState } from "react"
import { ScrollView, Text, View } from "react-native"


import DonutChart from "@/components/GraficoDonut/DonutChart"
import { IntervalSelector } from "@/components/IntervalSelector/IntervalSelector"
import SurfaceContainer from "@/components/SurfaceContainer/SurfaceContainer"
import { TranslacoesResume } from "@/components/TranslacoesResume/TranslacoesResume"
import { useDadosValue } from "@/context/dadosContext"
import { IIntervalo } from "@/types/intervalos"
import { carregarDadosStorage } from "@/utils/carregaDados"

export default function Dashboard() {
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

  const ano = new Date().getFullYear()
  const [intervalo, setIntervalo] = useState<IIntervalo>({
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
    function acumulador(intervalo?: IIntervalo, isSaldo = false) {
      let totalRenda = 0
      let totalDespesa = 0
      let totalInvestimento = 0

      dados.items.forEach(item => {
        if (item.tipoID && item.categoryID) {
          let categoria = dados.categories.find(c => c.id === item.categoryID)
          if (!categoria) return
          
          const valor = Number(item.value) || 0
          if (!isSaldo && intervalo) {
            const [ano, mes, dia] = item.date.split('-').map(Number)
            const [diaI, mesI, anoI] = intervalo.dataInicial.split('-').map(Number)
            const [diaF, mesF, anoF] = intervalo.dataFinal.split('-').map(Number)
            const dateTime = new Date(ano, mes, dia).getTime()
            const dateTimeI = new Date(anoI, mesI, diaI).getTime()
            const dateTimeF = new Date(anoF, mesF, diaF).getTime()

            if (dateTimeI <= dateTime && dateTimeF >= dateTime) {
              if (categoria.nome === "renda") totalRenda += valor
              if (categoria.nome === "despesa") totalDespesa += valor
              if (categoria.nome === "investimento") totalInvestimento += valor

            }
          }else {
            if (categoria.nome === "renda") totalRenda += valor
            if (categoria.nome === "despesa") totalDespesa += valor
            if (categoria.nome === "investimento") totalInvestimento += valor

          }
      }})
      
      return { totalRenda, totalDespesa, totalInvestimento }
    }
  
    if (!dados.items || !dados.categories) return
    const valores = acumulador(intervalo)
    const saldo = () => {
      const totais = acumulador(intervalo, true)
      return totais.totalRenda - (totais.totalDespesa + totais.totalInvestimento)
    }
    
    return { valores, saldo }
  }, [dados, intervalo])

  const dadosGrafico = useMemo(() => {
    if (!dados.items || !dados.categories) return
    const valores = totais?.valores

    return [
      { name: "Renda", value: valores?.totalRenda || 0, valueReais: valorFormatadoBR(valores?.totalRenda || 0), color: theme.renda },
      { name: "Despesas", value: valores?.totalDespesa || 0, valueReais: valorFormatadoBR(valores?.totalDespesa || 0), color: theme.despesa },
      { name: "Investimentos", value: valores?.totalInvestimento || 0, valueReais: valorFormatadoBR(valores?.totalInvestimento || 0), color: theme.investimento }
    ]
  }, [dados, theme, totais])

  const transacoes = useMemo(() => {
    if (!dados.items || !dados.categories) return []
    const catRendaId = dados.categories.find(categoria => categoria.nome === "renda")?.id

    return dados.items.filter(translacao => translacao.categoryID !== catRendaId)
  }, [dados])
  

  return (
    <>
      <View style={{ ...styles.bgSaldo, backgroundColor: theme.action}} />
      <View style={{ ...styles.containerSaldo, backgroundColor: theme.action}}>
        <Text style={{ ...styles.saldo, color: theme.background }}>
          {`Saldo = ${valorFormatadoBR(totais?.saldo() || 0)}`}
        </Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 200, marginTop: 70 }}>

        <View style={{ marginHorizontal: 'auto', gap: 20, width: '90%' }}>

          <SurfaceContainer titulo="Resumo">
            <IntervalSelector intervalo={intervalo} setIntervalo={setIntervalo} />
            <DonutChart data={dadosGrafico || []}>
              {valorFormatadoBR(totais?.saldo() || 0)}
            </DonutChart>
          </SurfaceContainer>
          <TranslacoesResume transacoes={transacoes} categories={dados.categories} intervalo={intervalo} />

        </View>

      </ScrollView>
    </>
  )
}
