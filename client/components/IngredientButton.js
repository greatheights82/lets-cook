import React from 'react'
import { Button, Text, Icon, Item, Container } from 'native-base'

const IngredientButton = props => {
  return (
    <Button
      iconLeft
      rounded
      success
      style={{
        margin: 10,
        alignSelf: 'center',
      }}
      onPress={props.onPress}
    >
      <Icon name="close" />
      <Text>{props.ingredient}</Text>
    </Button>
  )
}

export default IngredientButton
