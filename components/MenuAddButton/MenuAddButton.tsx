import { colors } from "@/constants/colors"
import { Ionicons } from "@expo/vector-icons"
import { useRef, useState } from "react"
import { Animated, Pressable, StyleSheet } from "react-native"
import { MenuAdd } from "../MenuAdd/MenuAdd"

export const MenuAddButton = () => {
  const rotateIcon = useRef(new Animated.Value(0)).current
  const opacityModal = useRef(new Animated.Value(0)).current
  const rotateAnim = rotateIcon.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg']
  })

  const opacityAnim = opacityModal.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  })
  const [modalHidden, setModalHidden] = useState(true)
  
  function rotateIconAnimation() {
    Animated.timing(rotateIcon, {
      toValue: !modalHidden ? 0:1,
      duration: 300,
      useNativeDriver: true,
    }).start()
    Animated.timing(opacityModal, {
      toValue: !modalHidden ? 0:1,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }

  return (
    <>
      <Pressable style={styles.button} onPress={e => {
          setModalHidden(!modalHidden)
          rotateIconAnimation()
        }}>
        <Animated.View style={{
          transform: [{
            rotate: rotateAnim,
          }]
        }}>
          <Ionicons 
            name="add-circle" 
            size={50} 
            color={modalHidden ? colors.primary : colors.placeholder} 
          />
        </Animated.View>
      </Pressable>
        <Animated.View 
          style={[
            styles.menuModalContainer,
            {
              opacity: opacityAnim
            }
          ]}
          pointerEvents={modalHidden ? 'none' : 'auto'}
        >
          <MenuAdd action={() => {
            setModalHidden(true)
            rotateIconAnimation()
          }}/>
        </Animated.View>
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
  },
  menuModalContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
})
