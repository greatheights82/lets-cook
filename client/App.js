import React from 'react'
import { StyleSheet, Text } from 'react-native'
import {
  Container,
  Content,
  Footer,
  Header,
  Button,
  Icon,
  Left,
  Body,
  Title,
  Right,
  Root,
} from 'native-base'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { FooterMenu, Main } from './components'
import { AppLoading, Font } from 'expo'
import { Provider } from 'react-redux'
import store from './redux'

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'green',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  header: {
    paddingTop: getStatusBarHeight(),
    height: 54 + getStatusBarHeight(),
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
        <Root>
          <Provider store={store}>
            <Container style={styles.container}>
              <Header style={styles.header}>
                <Left>
                  <Button transparent>
                    <Icon name="menu" />
                  </Button>
                </Left>
                <Body>
                  <Title>Header</Title>
                </Body>
                <Right />
              </Header>
              <Content>
                <Main styles={styles} />
              </Content>
              <FooterMenu />
            </Container>
          </Provider>
        </Root>
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
