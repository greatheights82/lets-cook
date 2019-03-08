import React from 'react'
import { Footer, FooterTab, Button, Text } from 'native-base'

export default class FooterMenu extends React.Component {
  render() {
    return (
      <Footer>
        <FooterTab>
          <Button>
            <Text>Plan!</Text>
          </Button>
          <Button>
            <Text>Saved Recipes</Text>
          </Button>
        </FooterTab>
      </Footer>
    )
  }
}
