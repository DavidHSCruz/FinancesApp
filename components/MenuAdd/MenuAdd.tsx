import { colors } from '@/constants/colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const MenuAdd = () => {
    return (
        <>
            <View style={styles.containerBlur} />
            <View style={styles.container}>
                <Text style={styles.text}>Renda</Text>
                <Text style={styles.text}>Despesa</Text>
                <Text style={styles.text}>Investimento</Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        paddingVertical: 10,
        paddingHorizontal: 20,
        bottom: 100,
        right: 100,
        borderRadius: 5,
        backgroundColor: colors.bg2,
    },
    containerBlur: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        backgroundColor: colors.bg2,
        opacity: 0.75,
    },
    text: {
        color: colors.text,
        padding: 20,
    }
})

