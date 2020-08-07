import React, { PureComponent } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Button from './partials/Button'
import { addCardToDeckApi } from '../utils/api'
import { red } from '../utils/colors'
import { addNewCard } from '../actions'

const MINIMUM_QUESTION_LENGTH = 8
const MINIMUM_ANSWER_LENGTH = 1

class AddCard extends PureComponent {
    state = {
        question: '',
        answer: '',
        errorQuestion: false,
        errorAnswer: false
    }

    createNewCard = () => {
        const {question, answer} = this.state
        const {addNewCard, navigation} = this.props

        if(question.length > MINIMUM_QUESTION_LENGTH && answer.length > MINIMUM_ANSWER_LENGTH) {
            const deckName = navigation.state.params.deck
            const card = {
                question,
                answer
            }

            addCardToDeckApi(deckName, card)
            addNewCard(deckName, card)
            this.setState({
                question: '',
                answer: ''
            })

            navigation.navigate('deck', { deck: deckName })
        } else {
            if(question.length <= MINIMUM_QUESTION_LENGTH) {
                this.setState({ errorQuestion: true })
            }
            if(answer.length <= MINIMUM_ANSWER_LENGTH) {
                this.setState({ errorAnswer: true })
            }
        }
    }

    render() {
        const {question, answer, errorQuestion, errorAnswer} = this.state

        return (
            <View style={styles.container}>
                {errorQuestion &&
                    <Text style={styles.error}>Invalid question</Text>
                }
                <TextInput
                    value={question}
                    onChangeText={newQuestion => this.setState({ question: newQuestion })}
                    onFocus={() => this.setState({ question: '', errorQuestion: false })}
                />

                {errorAnswer &&
                    <Text style={styles.error}>Invalid Answer</Text>
                }
                <TextInput
                    value={answer}
                    onChangeText={newAnswer => this.setState({ answer: newAnswer })}
                    onFocus={() => this.setState({ answer: '', errorAnswer: false })}
                />
                <View style={styles.buttonWrapper}>
                    <Button text='Create Card' onPress={this.createNewCard}/>
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
    buttonWrapper: {
        alignItems: "center"
    }
})

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addNewCard }, dispatch)
}

export default connect(null, mapDispatchToProps)(AddCard)