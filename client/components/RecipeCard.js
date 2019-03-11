import React from 'react'
import { Image } from 'react-native'
import {
  Card,
  CardItem,
  Text,
  Accordion,
  Item,
  Body,
  Container,
} from 'native-base'

class RecipeCard extends React.Component {
  render() {
    return (
      <Card style={{ marginLeft: 0, marginRight: 0 }}>
        <CardItem>
          <Text>{this.props.recipe.recipeName}</Text>
        </CardItem>
        <CardItem cardBody>
          <Image
            source={{ uri: this.props.recipe.imageUrlsBySize[90] }}
            style={{ height: 200, width: 200, flex: 1 }}
          />
        </CardItem>
        <CardItem>
          <Accordion
            dataArray={[
              {
                title: 'Ingredient List',
                content: this.props.recipe.ingredients.join(', '),
              },
            ]}
          />
        </CardItem>
      </Card>
    )
  }
}

export default RecipeCard
