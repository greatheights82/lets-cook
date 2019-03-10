import React from 'react'
import { Footer, FooterTab, Button, Text } from 'native-base'

export default class FooterMenu extends React.Component {
  render() {
    return (
      <Footer>
        <FooterTab>
          <Button>
            <Text>Text Search</Text>
          </Button>
          <Button>
            <Text>Image Search</Text>
          </Button>
        </FooterTab>
      </Footer>
    )
  }
}
