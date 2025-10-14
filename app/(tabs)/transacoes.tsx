import { useThemeColors } from "@/hooks/useThemeColors"
import { styles } from "@/styles/dashboard"
import { valorFormatadoBR } from "@/utils/formatacaoNumeros"
import { Fragment, useEffect, useMemo, useState } from "react"
import { Pressable, ScrollView, Text, View } from "react-native"


import Button from "@/components/Button/Button"
import EditTransacao from "@/components/EditTransacao/EditTransacao"
import SurfaceContainer from "@/components/SurfaceContainer/SurfaceContainer"
import { TranslacoesResume } from "@/components/TranslacoesResume/TranslacoesResume"
import { useDadosValue } from "@/context/dadosContext"
import { IFinanceCategory } from "@/types/category"
import { IIntervalo } from "@/types/intervalos"
import { MaterialCommunityIcons } from "@expo/vector-icons"

export default function Transacoes() {
  const theme = useThemeColors()
  const { dados, intervalo } = useDadosValue()

  
  const [isAddTransacao, setIsAddTransacao] = useState(false)
  const [menuOpened, setMenuOpened] = useState(false)
  const [selectedCategoryID, setSelectedCategoryID] = useState(-1)
  const [selectedTipoID, setSelectedTipoID] = useState(-1)

  const totais = useMemo(() => {
    function acumulador(intervalo: IIntervalo) {
      let totalRenda = 0
      let totalDespesa = 0
      let totalInvestimento = 0

      dados.items.forEach(item => {
        if (!item.categoryID) return
        if (item.tipoID || item.tipoID === 0) {
          let categoria = dados.categories.find(c => c.id === item.categoryID)
          if (!categoria) return
          
          const valor = Number(item.value) || 0
          
          if (intervalo) {
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
          }
      }})
      
      return { totalRenda, totalDespesa, totalInvestimento }
    }
  
    if (!dados.items || !dados.categories) return
    const valores = acumulador(intervalo)
    const saldo = () => {
      const totais = acumulador(intervalo)
      return totais.totalRenda - (totais.totalDespesa + totais.totalInvestimento)
    }
    
    return { valores, saldo }
  }, [dados, intervalo])

  const transacoes = useMemo(() => {
    if (!dados.items || !dados.categories) return []

    return dados.items
  }, [dados])

  return (
    <>
      <View style={{ ...styles.bgSaldo, backgroundColor: theme.action, zIndex: 0 }} />
      <View style={{ ...styles.containerSaldo, backgroundColor: theme.action, zIndex: 2 }}>
        <Text style={{ ...styles.saldo, color: theme.background }}>
          {`Saldo = ${valorFormatadoBR(totais?.saldo() || 0)}`}
        </Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 200, marginTop: 70, zIndex: 1 }}>
        <View style={{ marginHorizontal: 'auto', gap: 20, width: '90%' }}>

          <SurfaceContainer titulo="Transações" intervalo>
            <TranslacoesResume transacoes={transacoes} categories={dados.categories} edit />
            <Button 
              action={() => {
                setSelectedCategoryID(-1)
                setMenuOpened(true)
              }}
              style={{width: 200, borderRadius: 10}}
            >{isAddTransacao ? 'mudar categoria' : '+ add transação'}
            </Button>
            {menuOpened &&
              <Menu 
                setMenuOpened={setMenuOpened}
                categories={dados.categories}
                selectedCategoryID={selectedCategoryID}
                setSelectedCategoryID={setSelectedCategoryID}
                isAddTransacao={isAddTransacao}
                setIsAddTransacao={setIsAddTransacao}
                setSelectedTipoID={setSelectedTipoID}
              />
            }
            {isAddTransacao &&
              <EditTransacao
                transacao={{ 
                  id: 0, 
                  nome: '', 
                  value: '', 
                  date: '', 
                  categoryID: selectedCategoryID, 
                  tipoID: selectedTipoID 
                }}
                setIsEditable={setIsAddTransacao}
                setSelectedCategoryID={setSelectedCategoryID}
                add
              />
            }
          </SurfaceContainer>

        </View>
      </ScrollView>
    </>
  )
}

interface MenuProps {
  setMenuOpened: React.Dispatch<React.SetStateAction<boolean>>
  categories: IFinanceCategory[]
  selectedCategoryID: number
  setSelectedCategoryID: React.Dispatch<React.SetStateAction<number>>
  isAddTransacao: boolean
  setIsAddTransacao: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedTipoID: React.Dispatch<React.SetStateAction<number>>
}

const Menu = ({setMenuOpened, categories, selectedCategoryID, setSelectedCategoryID,isAddTransacao, setIsAddTransacao, setSelectedTipoID}: MenuProps) => {
    const theme = useThemeColors()
    const { intervalo } = useDadosValue()

    const data = intervalo.dataFinal.split('-')[2] + '-' + intervalo.dataFinal.split('-')[1]

    useEffect(() => {
      if (selectedCategoryID === 1) {
        setSelectedTipoID(0)
        setIsAddTransacao(true)
        setMenuOpened(false)
      }
    }, [selectedCategoryID, setSelectedTipoID, setIsAddTransacao, setMenuOpened])

    return (
        <View style={{
          padding: 10,
          width: 200,
          top: -30,
          gap: 10,
          borderRadius: 5,
          zIndex: 1, backgroundColor: theme.background
        }}>
            <Pressable 
              style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}} 
              onPress={e => setMenuOpened(false)}
            >
                <Text style={{color:theme.textSecondary}}>{isAddTransacao ? 'mudar categoria' : '+ add transação'}</Text>
                <MaterialCommunityIcons name="close" size={20} color={theme.placeholder} />
            </Pressable>

            {categories.map(cat => {
              const cor = () => {
                if (cat.nome === 'renda') return theme.renda
                if (cat.nome === 'despesa') return theme.despesa
                if (cat.nome === 'investimento') return theme.investimento
                return theme.placeholder
              }

              return(
                <Fragment key={cat.id}>
                  <View style={{backgroundColor: `${cor()}30`, borderRadius: 5, paddingHorizontal: 10}}>
                  <Pressable
                    style={{paddingVertical: 10}}
                    onPress={e => {
                        if (selectedCategoryID !== cat.id) setSelectedCategoryID(cat.id)
                        else setSelectedCategoryID(-1)
                      }
                  }>
                      <Text style={{color: cor()}}>{cat.nome}</Text>
                  </Pressable>
                    {selectedCategoryID === cat.id && selectedCategoryID !== 1 &&
                            
                      cat.tipos.map(tipo => {
                        const existe = tipo.informacoes.some(info => info.data === data)

                        if (!existe) return null
                        return(
                          <Pressable 
                            key={tipo.id}
                            style={{paddingVertical: 10, backgroundColor: theme.background, borderRadius: 5, paddingHorizontal: 10, marginBottom: 10}}
                            onPress={e => {
                                setSelectedTipoID(tipo.id)
                                setIsAddTransacao(true)
                                setMenuOpened(false)
                              }
                            }>
                              <Text style={{color: cor()}}>{tipo.nome}</Text>
                          </Pressable>
                        )
                      })
                    }
                  </View>
                </Fragment>
            )}
            )}
        </View>
    )
}
