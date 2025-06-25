import { colors } from "@/constants/colors"
import { IFinanceItem } from "@/types/Item"
import { useState } from "react"

import { FontAwesome6, Ionicons } from '@expo/vector-icons'

import { Pressable, Text, View } from "react-native"
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable"
import Reanimated, { SharedValue, useAnimatedStyle } from "react-native-reanimated"

import { styles } from "./stylesCard"
import deleteItem from "@/hooks/useDeleteItem"
import editItem from "@/hooks/useEditItem"
import { TextInput } from "react-native-gesture-handler"

function RightAction(prog: SharedValue<number>, drag: SharedValue<number>, newItem: IFinanceItem, items: IFinanceItem[], setItems: React.Dispatch<React.SetStateAction<IFinanceItem[]>>, tipoDeItem: string) {
    const styleAnimation = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: drag.value + 80 }],
        }
    })

    return (
        <Reanimated.View style={styleAnimation}>
            <View style={styles.containerActions}>
                <Pressable 
                    style={({pressed}) => [
                        styles.action,
                        {
                            filter: pressed ? 'brightness(1.2)' : 'brightness(1)',
                            backgroundColor: colors.actionOrange,
                        }
                    ]} onPress={() => {}}>
                    <FontAwesome6 name="edit" size={20} color={colors.secondary} />
                </Pressable>
                <Pressable 
                    style={({pressed}) => [
                        styles.action,
                        {
                            filter: pressed ? 'brightness(1.2)' : 'brightness(1)',
                            borderTopRightRadius: 5,
                            borderBottomRightRadius: 5,
                            backgroundColor: colors.actionRed,
                        }
                    ]} onPress={() => deleteItem(items, setItems, newItem, tipoDeItem)}>
                    <Ionicons name="trash" size={20} color={colors.secondary} />
                </Pressable>
            </View>
        </Reanimated.View>
    )
}

function Card({ item: newItem, items, setItems, tipoDeItem }: { item: IFinanceItem, items: IFinanceItem[], setItems: React.Dispatch<React.SetStateAction<IFinanceItem[]>>, tipoDeItem: string }) {
    const [aberto, setAberto] = useState(false)
    return (
        <Swipeable
            containerStyle={[styles.swipeable, {
                backgroundColor: aberto ? colors.placeholder : colors.renda,
            }]}
            friction={2}
            enableTrackpadTwoFingerGesture
            rightThreshold={40}
            onSwipeableOpen={() => {
                setAberto(true)
            }}
            onSwipeableClose={() => {
                setAberto(false)
            }}
            renderRightActions={(prog, drag) => RightAction(prog, drag, newItem, items, setItems, tipoDeItem)}
            overshootRight={false}
        >
            <View style={styles.item}>
                <Text style={styles.itemText}>{newItem.date}</Text>
                <Text style={styles.itemText}>{newItem.nome}</Text>
                <Text style={styles.itemText}>{newItem.value}</Text>
            </View>
        </Swipeable>
    )
}

export default Card
