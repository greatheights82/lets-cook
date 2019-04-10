import React from 'react'
import { StyleSheet } from 'react-native'
import {
  Container,
  Content,
  Header,
  Button,
  Icon,
  Left,
  Body,
  Title,
  Right,
  Root,
  Spinner,
} from 'native-base'
import { Main } from './components'
import { AppLoading, Font } from 'expo'
import { Provider } from 'react-redux'
import store from './redux'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
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
        <Container>
          <AppLoading
            startAsync={this._loadResources}
            onFinish={this._handleFinishLoading}
          />
          <Spinner color="green" />
        </Container>
      )
    } else {
      return (
        <Root>
          <Provider store={store}>
            <Container>
              <Header>
                <Left>
                  <Button transparent>
                    <Icon name="menu" />
                  </Button>
                </Left>
                <Body>
                  <Title>Let's Cook!</Title>
                </Body>
                <Right />
              </Header>
              <Content>
                <Main style={styles.container} />
              </Content>
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
