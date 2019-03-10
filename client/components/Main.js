import React from 'react'
import { connect } from 'react-redux'
import { Button, Text, Container, Item, Input, H1, Icon } from 'native-base'
import { StyleSheet } from 'react-native'
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
  }
  handleSearch = async () => {
    await this.props.performSearch()
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
              style={this.props.styles}
            />

            // <Button iconLeft rounded style={styles.button}>
            //   <Icon name="close" />
            //   <Text>{ingredient}</Text>
            // </Button>
          )
        })}

        {/* <Button
          rounded
          primary
          onPress={this.handleSearch}
          style={styles.button}
          name="search"
        >
          <Text>SEARCH</Text>
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
