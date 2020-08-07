import React, { Component } from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { StyleSheet, View, SafeAreaView } from 'react-native'
import Constants from "expo-constants"
import { StatusBar } from "expo-status-bar"
import Navigation from "./components/MainNavigator"
import reducer from './reducers'
import { purple } from "./utils/colors"
import { setLocalNotification } from "./utils/notification"

function BeautifulStatusBar ({backgroundColor, ...props}) {
  return (
      <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </View>
  )
}

export default class App extends Component {
    componentDidMount() {
        setLocalNotification()
    }

    render() {
        return (
            <Provider store={createStore(reducer)}>
                <SafeAreaView style={styles.container}>
                    <BeautifulStatusBar backgroundColor={purple} barStyle="light-content" />
                    <Navigation />
                </SafeAreaView>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})