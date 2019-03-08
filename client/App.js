import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FooterMenu from './components/FooterMenu'
import { AppLoading, Font } from 'expo'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <AppLoading
          startAsync={this._loadResources}
          onFinish={this._handleFinishLoading}
        />
      )
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Let's Cook!</Text>
          <FooterMenu />
        </View>
      )
    }
  }

  _loadResources = async () => {
    return Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    })
  }

  _handleFinishLoading = () => {
    this.setState({ isLoading: false })
  }
}
