import { useThemeColors } from '@/hooks/useThemeColors'
import { Text, View } from 'react-native'
import Svg, { Circle } from 'react-native-svg'
import { styles } from './styles'

interface SurfaceContainerProps {
    children: React.ReactNode
    titulo?: string
    cor?: string
}

const SurfaceContainer = ({children, titulo, cor}: SurfaceContainerProps) => {
    const theme = useThemeColors()

    let tituloFormatted
    if (titulo) {
        tituloFormatted = titulo.charAt(0).toUpperCase() + titulo.slice(1)
    }

    return (
        <View style={{ ...styles.containerSurface, backgroundColor: theme.surface }}>
            {titulo &&
                <View style={{ ...styles.titulosContainer, borderBottomColor: theme.placeholder }}>
                    {cor &&
                        <Svg height={20} width={20} viewBox="0 0 100 100" style={{marginRight: 10, marginBottom: 10}}>
                            <Circle cx="50" cy="50" r="45" fill={cor} />
                        </Svg>
                    }
                    <Text style={{ ...styles.titulo, color: theme.textSecondary }}>{tituloFormatted}</Text>
                </View>
            }
            {children}
        </View>
    )
}

export default SurfaceContainer
