import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { gray, purple, lightPurp } from '../utils/colors'
import Button from './partials/Button'
import EmptyDeck from './partials/EmptyDeck'
import ResultCard from "./partials/ResultCard"
import ShowCardButton from "./partials/ShowCardButton"
import { clearLocalNotification, setLocalNotification } from "../utils/notification"

const QUESTION = 'question'
const ANSWER = 'answer'
const CORRECT = 'correct'
const INCORRECT = 'incorrect'

class Quiz extends Component {
    state = {
        currentQuestion: 0,
        correctAnswers: 0,
        show: QUESTION,
        showResults: false
    }

    toggleCard = () => {
        const show = (this.state.show) === QUESTION ? ANSWER : QUESTION

        this.setState({ show })
    }

    userAnswered(answer) {
        const {correctAnswers, currentQuestion} = this.state
        const {questions} = this.props

        if(currentQuestion === questions.length - 1) {
            this.setState({ showResults: true })
        } else {
            this.setState({ currentQuestion: currentQuestion + 1 })
        }

        if(answer === CORRECT) {
            this.setState({ correctAnswers: correctAnswers + 1 })
        }
    }

    restartQuiz = () => {
        this.setState({
            currentQuestion: 0,
            correctAnswers: 0,
            show: QUESTION,
            showResults: false
        })

        clearLocalNotification().then(setLocalNotification)
    }

    goBack = () => {
        const {navigation} = this.props

        navigation.dispatch(NavigationActions.back())
    }

    render() {
        const {questions} = this.props
        const {correctAnswers, currentQuestion} = this.state
        const showingCard = questions[currentQuestion]

        if(questions.length === 0) {
            return <EmptyDeck />
        }

        if(this.state.showResults) {
            return (
                <ResultCard
                    totalAnswered={questions.length}
                    correct={correctAnswers}
                    restart={this.restartQuiz}
                    goBack={this.goBack}
                />
            )
        }

        return (
            <View style={{ flex: 1 }}>
                <View style={styles.quizProgress}>
                    <Text>Card {currentQuestion + 1}/{questions.length}</Text>
                </View>

                <View style={styles.quizCard}>
                    {
                        this.state.show === QUESTION
                            ? <Text style={styles.questionText}>{showingCard.question}</Text>
                            : <Text style={styles.answerText}>{showingCard.answer}</Text>
                    }

                    <ShowCardButton
                        toggle={this.toggleCard}
                        current={this.state.show}
                    />
                    <View>
                        <Button text='Correct' onPress={() => this.userAnswered(CORRECT)}/>
                        <Button text='Incorrect' onPress={() => this.userAnswered(INCORRECT)}/>
                    </View>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    quizProgress: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 8,
        backgroundColor: lightPurp
    },
    quizCard: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 25,
        padding: 25,
        backgroundColor: gray,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowRadius: 6,
        shadowOpacity: 1,
        elevation: 3
    },
    questionText: {
        fontSize: 22,
        marginBottom: 5,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    answerText: {
        fontSize: 26,
        marginBottom: 5,
        fontWeight: 'bold',
        textAlign: 'center',
        color: purple
    }
})

function mapStateToProps(state, props) {
    const {questions} = state[props.navigation.state.params.deck].questions

    return questions
}

export default connect(mapStateToProps)(Quiz)