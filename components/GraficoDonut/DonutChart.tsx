import { useThemeColors } from '@/hooks/useThemeColors'
import * as d3 from 'd3-shape'
import { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Svg, { G, Path, Text as SvgText } from 'react-native-svg'

interface DonutChartProps {
  width?: number
  height?: number
  data: Data[]
  children?: React.ReactNode
  innerRadius?: number 
  outerRadius?: number
}

interface Data {
  name: string
  value: number
  valueReais: string
  color: string
}

function DonutChart({
  width = 300,
  height = 300,
  data,
  children,
  innerRadius = 70,
  outerRadius = 100,
}: DonutChartProps) {
  const theme = useThemeColors()
  
  const pieGenerator = d3.pie<any>().value(d => d.value)
  const arcGenerator = d3.arc<any>()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .padAngle(0.05)

  const valores = data.map((item) => item.value)
  const total = valores.reduce((acc, value) => acc + value, 0)
  let arcs
  if (total === 0) {
    arcs = pieGenerator([{
      name: '',
      value: 1,
      valueReais: 'R$ 0,00',
      color: theme.placeholder
    }])
  }else {
    arcs = pieGenerator(data)
  }

  const centerX = width / 2
  const centerY = height / 2

  return (
    <View>
      <Svg width={width} height={height}>
        <G x={centerX} y={centerY}>
          {arcs.map((arc, index) => {
            const path = arcGenerator(arc)
            const [labelX, labelY] = arcGenerator.centroid(arc)

            return (
              <G key={`arc-${index}`}>
                <Path d={path!} fill={arc.data.color} />
                {arc.endAngle - arc.startAngle > 0.2 && (
                  <>
                    <SvgText
                        x={labelX}
                        y={labelY - 20}
                        fill={theme.textPrimary}
                        fontSize="15"
                        textAnchor="middle"
                    >
                        {/* {arc.data.name} */}
                    </SvgText>
                    <SvgText
                        x={0}
                        y={0}
                        textAnchor="middle"
                        alignmentBaseline="middle"
                        fontSize={20}
                        fontWeight="bold"
                        fill={theme.renda}
                        >
                        {children}
                    </SvgText>
                    <SvgText
                        x={labelX}
                        y={labelY}
                        fill={theme.textPrimary}
                        fontSize="12"
                        textAnchor="middle"
                    >
                        {/* {arc.data.valueReais} */}
                    </SvgText>
                  </>
                )}
              </G>
            )
          })}
        </G>
      </Svg>
      <View style={{ alignItems: 'center', marginTop: -20 }}>
        {data.map((item, index) => {
          const cor = () => {
            if (item.value === 0) return theme.placeholder
            if (item.name === 'Renda') return theme.renda
            if (item.name === 'Despesas') return theme.despesa
            if (item.name === 'Investimentos') return theme.investimento
            return theme.placeholder
          }

          return (
            <View key={index} style={ styles.container }>
              <View style={{ width: 12, height: 12, position: 'absolute', backgroundColor: cor(), marginRight: 8 }} />
              <View  style={{ ...styles.containerLegenda, borderBottomColor: cor() }}>
                <Text style={{ color: theme.textPrimary, width: '50%', paddingLeft: 16}}>{item.name}</Text>
                <Text style={{ color: cor(), fontSize: 12, width: '50%', textAlign: 'right'}}>{item.valueReais}</Text>
              </View>
              <Barra data={data} color={cor()} name={item.name} />
            </View>
          )
        })}
      </View>
    </View>
  )
}

function Barra({data, color, name}: { data: Data[], color: string, name: string}) {
  const tamBarra = useMemo(() => {
    let values: (string | number)[][] = data.map(item => [item.name, item.value])
    values = values.sort((a, b) => Number(a[1]) - Number(b[1]))
    const valorMax = 60
    const position = values.findIndex(item => item[0] === name)

    if (position === 2) return Number(values[2][1]) * valorMax / Number(values[2][1])
    if (position === 1) return Number(values[1][1]) * valorMax / Number(values[2][1])
    if (position === 0) return Number(values[0][1]) * valorMax / Number(values[2][1])
    return 0
  }, [data, name])


  return (
    <View style={{flexDirection: 'row', width: '100%', height: '70%',position: 'absolute'}}>
      <View style={{width: '40%', height: '100%', opacity: .2, backgroundColor: color}}></View>
      <View style={{width: `${tamBarra}%` || 0, height: '100%', opacity: .2, backgroundColor: color}}></View>
    </View>
  )
}

export default DonutChart

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center'
  },
  containerLegenda: { 
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
    width: '100%',
    borderBottomWidth: .5
  }
})
