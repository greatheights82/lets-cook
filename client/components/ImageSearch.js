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
    let searchImage = {}
    if (status) {
      searchImage = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Images',
        base64: true,
        quality: 0.5,
      })
    }
    // console.log(searchImage)
    if (!searchImage.cancelled) {
      this.props.clarifaiImage(searchImage.base64)
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Item>
            <Button
              rounded
              primary
              onPress={this._pickImage}
              style={styles.button}
              name="image"
            >
              <Text>Image Search</Text>
            </Button>
          </Item>
          <Image />
        </Content>
      </Container>
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
