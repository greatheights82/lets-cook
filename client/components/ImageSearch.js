import React from 'react'
import { connect } from 'react-redux'
import {
  Footer,
  FooterTab,
  Button,
  Text,
  Content,
  Container,
  Toast,
  Item,
  Input,
  H1,
} from 'native-base'
import { ImagePicker, Permissions } from 'expo'
import { checkPermissionsAsync } from '../utils'
import { StyleSheet } from 'react-native'

//redux
import { fetchRecipes, setResults } from '../redux/recipes'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'green',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  button: {
    alignSelf: 'center',
  },
})
export class Main extends React.Component {
  constructor() {
    super()
    this.state = {
      searchTerms: [],
    }
  }
  handleSearch = async () => {
    await this.props.performSearch()
  }

  checkCameraPermissionsAsync = async () => {
    const get = await Permissions.getAsync(Permissions.CAMERA_ROLL)
    console.log('get response', get)
    if (get.status !== 'granted') {
      try {
        const ask = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        console.log('ask response', ask)
        if (ask.status === 'denied') {
          console.log('im false')
          return false
        }
      } catch (error) {
        console.log(error)
        return false
      }
    }
    return true
  }

  _pickImage = async () => {
    const status = await this.checkCameraPermissionsAsync('CAMERA_ROLL')
    if (status) {
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Images',
      })
    }
    // if(!setResults.cancelled){
    //   this.setState({image:setResults.uri})
    // }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Text>
          <H1>Let's Cook!</H1>
        </Text>
        <Item rounded style={{ backgroundColor: 'white' }}>
          <Input rounded placeholder="Enter an ingredient" />
        </Item>

        <Button
          rounded
          primary
          onPress={this.handleSearch}
          style={styles.button}
          name="search"
        >
          <Text>SEARCH</Text>
        </Button>

        {/* <Button
          rounded
          primary
          onPress={this._pickImage}
          style={styles.button}
          name="image"
        >
          <Text>IMAGE PICKER</Text>
        </Button> */}
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  performSearch: () => dispatch(fetchRecipes()),
})

export default connect(
  null,
  mapDispatchToProps
)(Main)
