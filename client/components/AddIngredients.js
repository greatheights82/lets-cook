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
        alignSelf: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <Item
        rounded
        style={{
          width: '80%',
          backgroundColor: 'white',
        }}
      >
        <Input
          rounded
          placeholder="Add an ingredient to your search"
          value={props.value}
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
