import { colors } from "@/constants/colors"
import { IFinanceItem } from "@/types/Item"
import { StyleSheet, Text, View } from "react-native"
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable"
import Reanimated, {
    SharedValue,
    useAnimatedStyle,
} from "react-native-reanimated"

function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {
    const styleAnimation = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: drag.value + 50 }],
        }
    })

    return (
        <Reanimated.View style={styleAnimation}>
            <Text style={styles.rightAction}>Text</Text>
        </Reanimated.View>
    )
}

function Card({ item }: { item: IFinanceItem }) {
    return (
        <Swipeable
            containerStyle={styles.swipeable}
            friction={2}
            enableTrackpadTwoFingerGesture
            rightThreshold={40}
            renderRightActions={RightAction}
        >
            <View style={styles.item}>
                <Text style={styles.itemText}>{item.date}</Text>
                <Text style={styles.itemText}>{item.nome}</Text>
                <Text style={styles.itemText}>{item.value}</Text>
            </View>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    swipeable: {
        height: 50,
        marginVertical: 5,
        borderRadius: 5,
        justifyContent: "center",
    },
    item: {
        backgroundColor: colors.renda,
        width: "100%",
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        height: 50,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    itemText: {
        color: colors.text,
    },
    rightAction: {
        width: 50,
        height: 50,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: colors.error,
    },
})

export default Card
