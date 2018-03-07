import React, { Component, PropTypes } from 'react';
import {Menu, Dropdown, Button} from 'semantic-ui-react';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }
  state = { activeItem: 'home' }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu size='small'>
        <Menu.Item name='heatScore' active={activeItem === 'heatScore'} onClick={this.handleItemClick} />
        <Menu.Item name='for Users' active={activeItem === 'for Users'} onClick={this.handleItemClick} />
        <Menu.Item name='for Companies' active={activeItem === 'for Companies'} onClick={this.handleItemClick} />

        <Menu.Menu position='right'>
          <Menu.Item>
            <Button.Group>
              <Button positive>Log In</Button>
              <Button.Or />
              <Button primary>Sign Up</Button>
            </Button.Group>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      </div>
    );
  }
}

export default NavBar;
