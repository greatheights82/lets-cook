import React from 'react'
import { connect } from 'react-redux'
import { Button, Text, Container, Item, Input, H1, Icon } from 'native-base'
import { StyleSheet, View } from 'react-native'
import IngredientButton from './IngredientButton'
import AddIngredients from './AddIngredients'

//redux
import { fetchRecipes, setResults } from '../redux/recipes'

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexDirection: 'column',
    backgroundColor: 'green',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  button: {
    alignSelf: 'center',
    margin: 10,
    flex: 1,
  },
  ingredientContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
  },
})
export class Main extends React.Component {
  constructor() {
    super()
    this.state = {
      searchTerms: ['carrots', 'chicken', 'curry', 'potatoes', 'peas'],
      addIngredient: '',
    }
    this.removeSearchTerm = this.removeSearchTerm.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }
  handleSearch = async () => {
    await this.props.performSearch(this.state.searchTerms)
  }

  removeSearchTerm(event, ingredient) {
    console.log('im an on press')
    console.log('ingredient', ingredient)
    this.setState(prevState => ({
      searchTerms: prevState.searchTerms.filter(item => {
        return item !== ingredient
      }),
    }))
    console.log('new state', this.state)
  }

  handleTextBox = text => {
    console.log(text)
    this.setState(prevState => ({
      addIngredient: text,
    }))
  }

  handleTextSubmit = () => {
    console.log('im in the handleSubmit')
    const newIngredient = this.state.addIngredient
    console.log('newIngredient', newIngredient)
    console.log('searchTerms', this.state.searchTerms)
    this.setState(prevState => ({
      searchTerms: [...prevState.searchTerms].push(newIngredient),
    }))
    console.log('searchTerms after push', this.state.searchTerms)
  }

  render() {
    return (
      <Container style={styles.container}>
        <Text>
          <H1>Let's Cook!</H1>
        </Text>
        {/* <Item rounded style={{ backgroundColor: 'white' }}>
          <Input
            rounded
            placeholder="Enter an ingredient"
            onChangeText={this.handleTextBox}
          />
        </Item> */}
        <AddIngredients
          onChangeText={this.handleTextBox}
          onSubmit={this.handleTextSubmit}
        />
        <View style={styles.ingredientContainer}>
          {console.log('searchTerms in map', this.state.searchTerms)}
          {this.state.searchTerms.map(ingredient => {
            return (
              <IngredientButton
                key={ingredient}
                ingredient={ingredient}
                value={ingredient}
                onPress={event => this.removeSearchTerm(event, ingredient)}
              />
            )
          })}
        </View>

        <Button
          rounded
          primary
          onPress={this.handleSearch}
          style={styles.button}
          name="search"
        >
          <Text>FIND SOME RECIPES!</Text>
        </Button>
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  performSearch: ingredients => dispatch(fetchRecipes(ingredients)),
})

export default connect(
  null,
  mapDispatchToProps
)(Main)
