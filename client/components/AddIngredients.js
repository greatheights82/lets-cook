import React from 'react'
import { Item, Input, Button, Icon, View } from 'native-base'

const AddIngredients = props => {
  return (
    <Item
      style={{
        borderColor: 'transparent',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignContent: 'center',
      }}
    >
      <Item
        rounded
        style={{
          width: '70%',
          backgroundColor: 'white',
        }}
      >
        <Input
          rounded
          placeholder="Add an ingredient to your search"
          onChangeText={props.onChangeText}
          onSubmitEditing={props.onSubmit}
        />
      </Item>
      <Button rounded style={{ margin: 5 }}>
        <Icon name="add" onPress={props.onSubmit} />
      </Button>
    </Item>
  )
}

export default AddIngredients
