import React from 'react'
import { connect } from 'react-redux'
import { Button, Text, Container, Item, H1, Content, Body } from 'native-base'
import { StyleSheet } from 'react-native'
import IngredientButton from './IngredientButton'
import AddIngredients from './AddIngredients'
import RecipeCard from './RecipeCard'

//redux
import {
  fetchRecipes,
  addSearchTerm,
  removeSearchTerms,
  resetRecipes,
} from '../redux/recipes'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    alignSelf: 'center',
    margin: 10,
    flex: 1,
    justifyContent: 'center',
  },
  ingredientContainer: {
    borderColor: 'transparent',
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

  handleReset = () => {
    this.props.reset()
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
    this.setState(() => ({
      addIngredient: '',
    }))
  }

  render() {
    const { searchTerms, searchResults } = this.props
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
            <Item style={styles.ingredientContainer}>
              <Button
                rounded
                primary
                onPress={this.handleSearch}
                style={styles.button}
                name="search"
              >
                <Text>SEARCH</Text>
              </Button>
              <Button
                rounded
                primary
                onPress={this.handleReset}
                style={styles.button}
                name="reset"
              >
                <Text>RESET</Text>
              </Button>
            </Item>
            {!searchResults
              ? ''
              : searchResults.map(recipe => {
                  return <RecipeCard key={recipe.id} recipe={recipe} />
                })}
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
