import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Button from "./Button"

const ResultCard = (props) => (
    <View style={styles.resultCard}>
        <Text style={styles.resultCardText}>Total answered questions: {props.totalAnswered}</Text>
        <Text style={styles.resultCardText}>Correct Answers: {props.correct}</Text>
        <Button text='Restart' onPress={props.restart} />
        <Button text='Go Back' onPress={props.goBack} />
    </View>
)

const styles = StyleSheet.create({
    resultCard: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    resultCardText: {
        fontWeight: 'bold',
        textAlign: 'center',
    }
})

export default ResultCard