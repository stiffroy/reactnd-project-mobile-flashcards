import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { purple, lightPurp, white, gray } from '../../utils/colors'

class Deck extends Component {
    render() {
        return (
            <TouchableWithoutFeedback
                onPress={() => this.props.showDeck(this.props.deck.title)}
            >
                <View style={styles.deck}>
                    <Text style={styles.title}>{this.props.deck.title}</Text>
                    <Text style={styles.cards}>Cards: {this.props.deck.questions.length}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    deck: {
        backgroundColor: purple,
        marginBottom: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 10, height: 10 },
        shadowColor: gray,
        shadowRadius: 5,
        shadowOpacity: 0.8,
        elevation: 3
    },
    title: {
        marginBottom: 5,
        fontSize: 18,
        color: white,
    },
    cards: {
        color: lightPurp,
        fontSize: 15
    }
})

export default Deck