import { colors } from '@/constants/colors'
import * as d3 from 'd3-shape'
import { View } from 'react-native'
import Svg, { G, Path, Text as SvgText } from 'react-native-svg'

interface DonutChartProps {
  width?: number
  height?: number
  data: {
    name: string
    value: number
    valueReais: string
    color: string
  }[]
  innerRadius?: number
  outerRadius?: number
}

function DonutChart({
  width = 300,
  height = 300,
  data,
  innerRadius = 70,
  outerRadius = 100,
}: DonutChartProps) {
  const pieGenerator = d3.pie<any>().value(d => d.value)
  const arcGenerator = d3.arc<any>()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .padAngle(0.05)

  const arcs = pieGenerator(data)

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
                <Path d={path!} fill={data[index].color} />
                {arc.endAngle - arc.startAngle > 0.2 && (
                  <>
                    <SvgText
                        x={labelX}
                        y={labelY - 20}
                        fill={colors.text}
                        fontSize="15"
                        textAnchor="middle"
                    >
                        {data[index].name}
                    </SvgText>
                    <SvgText
                        x={0}
                        y={0}
                        textAnchor="middle"
                        alignmentBaseline="middle"
                        fontSize={30}
                        fontWeight="bold"
                        fill={colors.text}
                        opacity={0.1}
                        >
                        Total
                    </SvgText>
                    <SvgText
                        x={labelX}
                        y={labelY}
                        fill={colors.text}
                        fontSize="12"
                        textAnchor="middle"
                    >
                        {data[index].valueReais}
                    </SvgText>
                  </>
                )}
              </G>
            );
          })}
        </G>
      </Svg>
    </View>
  )
}

export default DonutChart
