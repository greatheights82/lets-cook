import React from 'react'
import { connect } from 'react-redux'
import { Button, Text, Container, Item, Input, H1, Icon } from 'native-base'
import { StyleSheet, View } from 'react-native'
import IngredientButton from './IngredientButton'
import AddIngredients from './AddIngredients'

//redux
import {
  fetchRecipes,
  addSearchTerm,
  removeSearchTerms,
} from '../redux/recipes'

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
    justifyContent: 'center',
  },
})
export class Main extends React.Component {
  constructor() {
    super()
    this.state = {
      addIngredient: '',
    }
    // this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch = async () => {
    await this.props.performSearch(this.props.searchTerms)
  }

  removeSearchTerm = (event, ingredient) => {
    this.props.removeSearchTerm(ingredient)
  }

  handleTextBox = text => {
    console.log(text)
    this.setState(() => ({
      addIngredient: text,
    }))
  }

  handleTextSubmit = () => {
    const newIngredient = this.state.addIngredient
    this.props.addSearchTerm(newIngredient)
  }

  render() {
    const { searchTerms } = this.props
    return (
      <Container style={styles.container}>
        <Text>
          <H1>Let's Cook!</H1>
        </Text>
        <AddIngredients
          onChangeText={this.handleTextBox}
          onSubmit={this.handleTextSubmit}
        />
        <View style={styles.ingredientContainer}>
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

const mapStateToProps = state => ({
  searchTerms: state.searchTerms,
})

const mapDispatchToProps = dispatch => ({
  performSearch: ingredients => dispatch(fetchRecipes(ingredients)),
  removeSearchTerm: ingredientToRemove =>
    dispatch(removeSearchTerms(ingredientToRemove)),
  addSearchTerm: newIngredient => dispatch(addSearchTerm(newIngredient)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
