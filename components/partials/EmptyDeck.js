import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

const NoCards = () => (
    <View style={styles.emptyDeck}>
        <Text style={styles.emptyDeckText}>This is an empty deck. Please add some cards</Text>
    </View>
)

const styles = StyleSheet.create({
    emptyDeck: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyDeckText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default NoCards