import React from 'react'
import { Button, Text, Icon, Item, Container } from 'native-base'

const IngredientButton = props => {
  return (
    <Button
      iconLeft
      rounded
      success
      style={{
        alignSelf: 'center',
        margin: 10,
      }}
      onPress={props.onPress}
    >
      <Icon name="close" />
      <Text>{props.ingredient}</Text>
    </Button>
  )
}

export default IngredientButton
