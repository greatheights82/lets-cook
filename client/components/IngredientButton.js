import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Button, Text, Icon } from 'native-base'

class IngredientButton extends Component {
  render() {
    return (
      <Button
        iconLeft
        rounded
        style={{
          alignSelf: 'center',
          margin: 10,
        }}
      >
        <Icon name="close" />
        <Text>{this.props.ingredient}</Text>
      </Button>
    )
  }
}

export default IngredientButton
