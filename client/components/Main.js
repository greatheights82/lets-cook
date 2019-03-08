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
} from 'native-base'
import { ImagePicker, Permissions } from 'expo'

//redux
import { fetchRecipes, setResults } from '../redux/recipes'

export class Main extends React.Component {
  handlePress = async () => {
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
    const status = await this.checkCameraPermissionsAsync()
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
      <Content>
        <Text style={this.props.styles.title}>Let's Cook!</Text>
        <Button rounded primary onPress={this.handleSearch} name="search">
          <Text>SEARCH</Text>
        </Button>
        <Button rounded primary onPress={this._pickImage} name="image">
          <Text>IMAGE PICKER</Text>
        </Button>
      </Content>
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
