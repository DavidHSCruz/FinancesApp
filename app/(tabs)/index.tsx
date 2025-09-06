import DonutChart from "@/components/GraficoDonut/DonutChart"
import { IntervalSelector } from "@/components/IntervalSelector/IntervalSelector"
import { MenuAddButton } from "@/components/MenuAddButton/MenuAddButton"
import TiposPorCategoria from "@/components/TiposPorCategoria/TiposPorCategoria"
import { colors } from "@/constants/colors"
import { useDadosValue } from "@/context/dadosContext"
import { styles } from "@/styles"
import { IFinanceCategory } from "@/types/category"
import { IDados } from "@/types/dados"
import { IIntervalo } from "@/types/intervalos"
import { IFinanceItem } from "@/types/Item"
import { carregarDadosStorage } from "@/utils/carregaDados"
import { useEffect, useState } from "react"
import { SafeAreaView, ScrollView, Text, View } from "react-native"
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


  useEffect(() => {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const CORES_POR_TIPO = {
    renda: colors.renda,
    investimento: colors.investimento,
    despesa: colors.despesa
  } as const

  const calcularSaldo = (dados: { renda: number, despesa: number, investimento: number }): number => {
    return dados.renda - (dados.despesa + dados.investimento)
  }

  function formatarBRL(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  function somarValores (itens: DataItem[]): { renda: number, despesa: number, investimento: number } {
    return itens.reduce(
      (acumulador, grupo) => {
        const somaValores = grupo.items.reduce((total, subItem) => total + parseFloat(subItem.value.toString()), 0)

        return {
          ...acumulador,
          [grupo.tipo]: somaValores,
        }

      }, { renda: 0, despesa: 0, investimento: 0 }
    )
  }

  function separaItemsPorCategory(items: IFinanceItem[]): DataItem[] {
    const categories = dados.categories

    return categories.map(category => ({
      tipo: category.nome,
      items: items.filter(item => item.categoryID === category.id)
    }))
  }

  // function selecionaDadosInvestimentosDespesas(dados: IDados) {
  //   const idDaRenda = dados.categories.find(category => category.nome === 'renda')?.id
    
  //   return dados.items.filter(item => item.categoryID !== idDaRenda)
  // }

  function selecionaItemsPorPeriodo(items: IFinanceItem[], intervalo: IIntervalo) {
    const { dataInicial, dataFinal } = intervalo

    //Vai ser alterado pelo ano selecionado
    const dataAno = new Date().getFullYear()
    
    const [[ diaI, mesI, anoI ], [ diaF, mesF, anoF ]] = [dataInicial, dataFinal].map(data => data.split('-').map(Number))
    
    return items.filter(item => {
      const dataItem = `${item.date}-${dataAno}`
      const [ dia, mes, ano ] = dataItem.split('-').map(Number)
      
      if (dataInicial === dataFinal) {
        return `${dia}-${mes}-${ano}` === `${diaI}-${mesI}-${anoI}`
      }

      const dataFinalUTC = new Date(anoF, mesF - 1, diaF).getTime()
      const dataInicialUTC = new Date(anoI, mesI - 1, diaI).getTime()
      const dataItemUTC = new Date(ano, mes - 1, dia).getTime()

      return dataItemUTC >= dataInicialUTC && dataItemUTC <= dataFinalUTC
    })
  }

  function formatarDadosGrafico(dados: IDados) {
    //const itemsGrafico = selecionaDadosInvestimentosDespesas(dados)
    const itemsPorPeriodo = selecionaItemsPorPeriodo(dados.items, intervalo)
    const itemsPorTipo = separaItemsPorCategory(itemsPorPeriodo)
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

  const ano = new Date().getFullYear()
  const [intervalo, setIntervalo] = useState({
    nome: 'Ano',
    dataInicial: `01-01-${ano}`,
    dataFinal: `31-12-${ano}`
  })

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dados])

  useEffect(() => {
    if (dados.items && dados.items.length > 0 && dados.categories && dados.categories.length > 0) {
      setDadosGrafico(formatarDadosGrafico(dados))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dados, intervalo])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>
        <View style={styles.containerSaldo}>
          <Text style={styles.saldo}>{`Saldo = ${formatarBRL(saldo)}`}</Text>
        </View>
        <View style={{marginTop: -40, alignItems: 'center'}}>
          <View style={styles.containerResumo}>
            <View style={styles.containerGrafico}>
              <View style={styles.titulosContainer}>
                <Text style={styles.titulo}>Resumo</Text>
              </View>
              <IntervalSelector intervalo={intervalo} setIntervalo={setIntervalo}/>
              <DonutChart data={dadosGrafico}>
                {formatarBRL(saldo)}
              </DonutChart> 
            </View>
            <TiposPorCategoria categoriasSemRenda={categoriasSemRenda} CORES_POR_TIPO={CORES_POR_TIPO} />
          </View>
        </View>
      </ScrollView>
      <MenuAddButton />
    </SafeAreaView>
  )
}
