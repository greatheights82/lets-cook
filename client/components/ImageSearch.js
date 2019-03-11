import React from 'react'
import { connect } from 'react-redux'
import { Image, StyleSheet } from 'react-native'
import { Text, Content, Container, Item, H1, Button } from 'native-base'
import { ImagePicker, Permissions } from 'expo'

//redux
import { handleImage } from '../redux/recipes'

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
export class ImageSearch extends React.Component {
  handleSearch = async () => {
    await this.props.performSearch()
  }

  checkCameraPermissionsAsync = async () => {
    const get = await Permissions.getAsync(Permissions.CAMERA_ROLL)
    if (get.status !== 'granted') {
      try {
        const ask = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (ask.status === 'denied') {
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
    let searchImage = {}
    if (status) {
      searchImage = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Images',
        base64: true,
        quality: 0.5,
      })
    }
    if (!searchImage.cancelled) {
      this.props.clarifaiImage(searchImage.base64)
    }
  }

  render() {
    return (
      <Button
        rounded
        primary
        onPress={this._pickImage}
        style={{
          alignSelf: 'center',
          margin: 10,
          flex: 1,
          justifyContent: 'center',
        }}
        name="image"
      >
        <Text>Image Search</Text>
      </Button>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  clarifaiImage: imageBits => dispatch(handleImage(imageBits)),
})

export default connect(
  null,
  mapDispatchToProps
)(ImageSearch)
