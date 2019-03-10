import React from 'react'
import { connect } from 'react-redux'
import { Button, Text, Container, Item, Input, H1, Icon } from 'native-base'
import { StyleSheet, ReactNativeComponentTree } from 'react-native'
import IngredientButton from './IngredientButton'

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
    margin: 10,
  },
})
export class Main extends React.Component {
  constructor() {
    super()
    this.state = {
      searchTerms: ['carrots', 'chicken', 'curry'],
    }
    this.removeSearchTerm = this.removeSearchTerm.bind(this)
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

  render() {
    return (
      <Container style={styles.container}>
        <Text>
          <H1>Let's Cook!</H1>
        </Text>
        <Item rounded style={{ backgroundColor: 'white' }}>
          <Input rounded placeholder="Enter an ingredient" />
        </Item>
        {this.state.searchTerms.map(ingredient => {
          return (
            <IngredientButton
              key={ingredient}
              ingredient={ingredient}
              value={ingredient}
              onPress={event => this.removeSearchTerm(event, ingredient)}
            />
            // <Button
            //   iconLeft
            //   rounded
            //   success
            //   style={{
            //     alignSelf: 'center',
            //     margin: 10,
            //   }}
            //   onPress={this.removeSearchTerm.bind(this)}
            //   name={ingredient}
            //   key={ingredient}
            // >
            //   <Icon name="close" />
            //   <Text>ingredient</Text>
            // </Button>
          )
        })}

        <Button
          rounded
          primary
          onPress={this.handleSearch}
          style={styles.button}
          name="search"
        >
          <Text>SEARCH</Text>
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
