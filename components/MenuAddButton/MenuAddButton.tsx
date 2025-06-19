import { colors } from "@/constants/colors"
import { Ionicons } from "@expo/vector-icons"
import { Animated, Pressable, StyleSheet } from "react-native"
import { MenuAdd } from "../MenuAdd/MenuAdd"

interface MenuAddProps {
  onPress: () => void,
  hiddenModal: boolean
}
export const MenuAddButton = ({ onPress: setHidden , hiddenModal } : MenuAddProps ) => {
  const rotateIcon = new Animated.Value(0)
  const rotateAnim = rotateIcon.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg']
  })

  function rotateIconAnimation() {
    Animated.timing(rotateIcon, {
      toValue: !hiddenModal ? 0:1,
      duration: 300,
      useNativeDriver: true,
    }).start(setHidden)
  }

  return (
    <>
      <Pressable style={styles.button} onPress={rotateIconAnimation}>
        <Animated.View style={{
          transform: [{rotate: rotateAnim}]
        }}>
          <Ionicons name="add-circle" size={50} color={colors.primary} />
        </Animated.View>
      </Pressable>
      {!hiddenModal && <MenuAdd />}
    </>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    position: "absolute",
    bottom: 80,
    right: 20,
    zIndex: 100,
  }
})
