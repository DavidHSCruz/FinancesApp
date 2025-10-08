import { useThemeColors } from '@/hooks/useThemeColors'
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native'

const Button = ({action, children, style}: {action: () => void, children: React.ReactNode, style?: StyleProp<ViewStyle>}) => {
    const theme = useThemeColors()
    return (
        <Pressable
            style={[{...styles.button, backgroundColor: theme.background}, style]}
            onPress={e => {
                action()
            }}
        >
            <Text style={{color: theme.textSecondary}}>{children}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 5,
        marginTop: 10,
        width: 100,
        borderRadius: 25,
        alignItems: 'center'
    }
})

export default Button
