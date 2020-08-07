import React from 'react'
import {View, Text, TouchableWithoutFeedback} from 'react-native'

const ShowCardButton = (props) => (
    <TouchableWithoutFeedback onPress={props.toggle}>
        <View>
            {
                props.current == 'question'
                    ? <Text>Show Answer</Text>
                    : <Text>Show Question</Text>
            }
        </View>
    </TouchableWithoutFeedback>
)
export default ShowCardButton