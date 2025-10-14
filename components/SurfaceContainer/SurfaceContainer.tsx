import { useThemeColors } from '@/hooks/useThemeColors'
import { StyleProp, Text, View, ViewStyle } from 'react-native'
import Svg, { Circle } from 'react-native-svg'
import { FiltroSelected } from '../IntervalSelector/FiltroSelected/FiltroSelected'
import { styles } from './styles'

interface SurfaceContainerProps {
    children: React.ReactNode
    titulo?: string
    cor?: string
    style?: StyleProp<ViewStyle>
    intervalo?: boolean
}

const SurfaceContainer = ({children, titulo, cor, style, intervalo: i}: SurfaceContainerProps) => {
    const theme = useThemeColors()
    
    let tituloFormatted
    if (titulo) {
        tituloFormatted = titulo.charAt(0).toUpperCase() + titulo.slice(1)
    }

    return (
        <View style={[{ ...styles.containerSurface, backgroundColor: theme.surface }, style]}>
            {titulo &&
                <View style={{ ...styles.titulosContainer, borderBottomColor: theme.placeholder }}>
                    {cor &&
                        <Svg height={20} width={20} viewBox="0 0 100 100" style={{marginRight: 10, marginBottom: 10}}>
                            <Circle cx="50" cy="50" r="45" fill={cor} />
                        </Svg>
                    }
                    <Text style={{ ...styles.titulo, color: theme.textSecondary }}>{tituloFormatted}</Text>
                    {i &&
                        <View style={{ position: 'absolute', right: 10 }}>
                            <FiltroSelected />
                        </View>
                    }
                </View>
            }
            {children}
        </View>
    )
}

export default SurfaceContainer
