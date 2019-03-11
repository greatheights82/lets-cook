import React from 'react'
import { connect } from 'react-redux'
import { Text, Content, Container, Item, H1, Button } from 'native-base'
import { ImagePicker, Permissions } from 'expo'
import { checkPermissionsAsync } from '../utils'
import { StyleSheet } from 'react-native'
import IngredientButton from './IngredientButton'
import AddIngredients from './AddIngredients'

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
        <Body>
          <Content>
            <Text style={{ alignSelf: 'center' }}>
              <H1>Let's Cook!</H1>
            </Text>
            <AddIngredients
              onChangeText={this.handleTextBox}
              onSubmit={this.handleTextSubmit}
              value={this.state.addIngredient}
            />
            <Item style={styles.ingredientContainer}>
              {searchTerms.map(ingredient => {
                return (
                  <IngredientButton
                    key={ingredient}
                    ingredient={ingredient}
                    value={ingredient}
                    onPress={event => this.removeSearchTerm(event, ingredient)}
                  />
                )
              })}
            </Item>
            <Item>
              <Button
                rounded
                primary
                onPress={this._pickImage}
                style={styles.button}
                name="image"
              >
                <Text>Upload and Image</Text>
              </Button>
            </Item>
          </Content>
        </Body>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  searchResults: state.recipes,
  searchTerms: state.searchTerms,
})

const mapDispatchToProps = dispatch => ({
  performSearch: ingredients => dispatch(fetchRecipes(ingredients)),
  removeSearchTerm: ingredientToRemove =>
    dispatch(removeSearchTerms(ingredientToRemove)),
  addSearchTerm: newIngredient => dispatch(addSearchTerm(newIngredient)),
  reset: () => dispatch(resetRecipes()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
