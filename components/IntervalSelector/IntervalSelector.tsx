import { colors } from "@/constants/colors"
import { Pressable, Text, View } from "react-native"
import { styles } from "./styles"

export const IntervalSelector = ({intervalo, setIntervalo}: {intervalo: string, setIntervalo: (intervalo: string) => void}) => {
    const intervalosSelector = [ 'Dia', 'Semana', 'Mês', 'Ano', 'Período']
    return (
        <>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%', paddingBottom: 20}}>
                {intervalosSelector.map((i, index) => (
                    <Pressable 
                        key={index} 
                        style={intervalo === i && styles.filtro}
                        onPress={() => setIntervalo(i)}
                    >
                        <Text style={{color: colors.text}}>{i}</Text>
                    </Pressable>
                ))}
            </View>
            <View><Text style={styles.text}>18 de fev -24 de fev</Text></View>
        </>
  )
}
