import React, { Component } from 'react'
import { View, TextInput, Text, StyleSheet } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Button from './partials/Button'
import { addNewDeck } from '../actions'
import { createDeckApi } from '../utils/api'
import { red } from '../utils/colors'

const MINIMUM_TITLE_LENGTH = 3

class AddDeck extends Component {
    state = {
        title: 'Title',
        error: false
    }

    createNewDeck = () => {
        const {title} = this.state
        const {addNewDeck, navigation} = this.props

        if(title.length > MINIMUM_TITLE_LENGTH) {
            createDeckApi(title)
            const deck = {
                [title]: { title, questions: [] }
            }
            addNewDeck(deck)
            navigation.navigate('deck', { deck: title })
        } else {
            this.setState({ error: true })
        }
    }

    render() {
        const {title, error} = this.state
        return (
            <View style={styles.container}>
                {error &&
                    <Text style={styles.error}>!! Please add a longer deck name !!</Text>
                }
                <TextInput
                    value={title}
                    onChangeText={newTitle => this.setState({ title: newTitle })}
                    onFocus={() => this.setState({ title: '', error: false })}
                    style={styles.titleInput}
                />
                <View style={styles.buttonWrapper}>
                    <Button text='Create Deck' onPress={this.createNewDeck}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'flex-start',
    },
    error: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: red
    },
    titleInput: {
        padding: 10,
        marginTop: 35,
        marginBottom: 10,
        fontSize: 17
    },
    buttonWrapper: {
        alignItems: "center"
    }
})

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addNewDeck }, dispatch)
}

export default connect(null, mapDispatchToProps)(AddDeck)