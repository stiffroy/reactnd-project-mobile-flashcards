import React, { Component } from 'react'
import { FlatList, StyleSheet, Text } from 'react-native'
import { connect } from 'react-redux'
import { getDecksApi } from "../utils/api";
import { getAllDecks } from '../actions'
import Deck from './partials/Deck'

class DeckList extends Component {
    componentDidMount() {
        const { dispatch } = this.props

        getDecksApi().then((decks) => dispatch(getAllDecks(decks)))
    }

    _keyExtractor = (item, index) => index

    showDeck = (deck) => {
        this.props.navigation.navigate('deck', { deck })
    }

    render() {
        const { decks } = this.props
        return (
            <FlatList
                style={styles.deckList}
                data={Object.values(decks)}
                keyExtractor={this._keyExtractor}
                renderItem={({ item }) => (
                    <Deck
                        deck={item}
                        showDeck={this.showDeck}
                    />
                )}
            />
        )
    }
}

const styles = StyleSheet.create({
    deckList: {
        flex: 1,
        alignSelf: 'stretch',
        marginTop: 5,
        padding: 10
    }
})

function mapStateToProps(state, { navigation }) {
    return { decks: state, navigation }
}

export default connect(mapStateToProps)(DeckList)
