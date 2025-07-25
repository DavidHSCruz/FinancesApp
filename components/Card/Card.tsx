import { colors } from "@/constants/colors"
import { IFinanceItem } from "@/types/Item"
import { useState } from "react"

import { FontAwesome6, Ionicons } from '@expo/vector-icons'

import { Modal, Pressable, Text, View } from "react-native"
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable"
import Reanimated, { SharedValue, useAnimatedStyle } from "react-native-reanimated"

import deleteItem from "@/hooks/useDeleteItem"
import editItem from "@/hooks/useEditItem"
import { valorFormatadoBR } from "@/utils/formatacaoNumeros"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { InputList } from "../InputList/InputList"
import { styles } from "./styles"
import { useDadosValue } from "@/context/dadosContext"

interface CardProps { 
    item: IFinanceItem, 
    newItem: IFinanceItem, 
    setItem: React.Dispatch<React.SetStateAction<IFinanceItem>>, 
    categoria: string,
    cor: string,
}

function RightAction(
    prog: SharedValue<number>, 
    drag: SharedValue<number>, 
    item: IFinanceItem,
    setEditModalVisible: React.Dispatch<React.SetStateAction<boolean>>
) {
    const styleAnimation = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: drag.value + 80 }],
        }
    })

    const { dados, setDados } = useDadosValue()

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
                    ]} onPress={() => setEditModalVisible(true)}>
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
                    ]} onPress={() => deleteItem(
                                        dados, 
                                        setDados,
                                        item
                                    )}>
                    <Ionicons name="trash" size={20} color={colors.secondary} />
                </Pressable>
            </View>
        </Reanimated.View>
    )
}

function Card({ 
    item, 
    newItem, 
    setItem, 
    categoria,
    cor 
}: CardProps) {
    const [aberto, setAberto] = useState(false)
    const [editModalVisible, setEditModalVisible] = useState(false)

    const { dados, setDados } = useDadosValue()

    return (
        <>
            <Swipeable
                containerStyle={[styles.swipeable, {
                    backgroundColor: aberto ? colors.placeholder : cor,
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
                renderRightActions={(prog, drag) => RightAction(
                                                        prog, 
                                                        drag, 
                                                        item,
                                                        setEditModalVisible
                                                    )}
                overshootRight={false}
            >
                <View style={styles.item}>
                    <Text style={styles.itemText}>{item.date}</Text>
                    <Text style={styles.itemText}>{item.nome}</Text>
                    <Text style={styles.itemText}>{valorFormatadoBR(Number(item.value))}</Text>
                </View>
            </Swipeable>
            <SafeAreaProvider>
                <SafeAreaView>
                    <Modal 
                        visible={editModalVisible} 
                        animationType="fade"
                        transparent={true}
                        navigationBarTranslucent={false}
                    >
                        <View style={styles.containerModalEdit}>
                            <View style={styles.ModalEdit}>
                                <InputList
                                    action={() => {
                                        editItem(
                                            item, 
                                            dados, 
                                            setDados, 
                                            newItem, 
                                            categoria
                                        )
                                        setEditModalVisible(false)
                                    }} 
                                    corTipo={colors.placeholder}
                                    item={newItem} 
                                    setItem={setItem}>
                                    <Text style={{color: colors.text}}>
                                        <FontAwesome6 name="check" size={20} color="black" />
                                    </Text>
                                </InputList>
                            </View>
                        </View>
                    </Modal>
                </SafeAreaView>
            </SafeAreaProvider>
        </>
    )
}

export default Card
