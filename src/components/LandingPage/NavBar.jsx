import React, { Component, PropTypes } from 'react';
import {Menu, Dropdown, Button, Image} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {login,goToPage} from '../../actions/UsersActions';
import {LOG_IN_FORM, SIGN_UP_FORM} from '../../actions/constants';

const options = [
  { key: 'user', text: 'Account', icon: 'user' },
  { key: 'settings', text: 'Settings', icon: 'settings' },
  { key: 'sign-out', text: 'Sign Out', icon: 'sign out' },
]
class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'heatScore',
      user:null,
    };
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  trigger(){
    return(
      <span>
        <Image avatar src="https://image.flaticon.com/icons/svg/149/149072.svg" /> Guest
      </span>
    )
  }

  LogSign(){
    if(this.state.user){
      return(
        <div>
          <Dropdown trigger={this.trigger()} options={options} pointing='top left' icon={null} />
        </div>
      )
    }
    else{
      return(
        <div>
          <Menu.Item>
            <Button.Group>
              <Button positive onClick={()=>{this.props.goToPage(LOG_IN_FORM)}}>Log In</Button>
              <Button.Or />
              <Button primary onClick={()=>{this.props.goToPage(SIGN_UP_FORM)}}>Sign Up</Button>
            </Button.Group>
          </Menu.Item>
        </div>
      )
    }
  }


  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu size='small'>
        <Menu.Item>
          <img src="https://goo.gl/z5vYiX"/>
        </Menu.Item>
        <Menu.Item name='for Users' active={activeItem === 'for Users'} onClick={this.handleItemClick} />
        <Menu.Item name='for Companies' active={activeItem === 'for Companies'} onClick={this.handleItemClick} />

        <Menu.Menu position='right'>
          {this.LogSign()}
        </Menu.Menu>
      </Menu>
      </div>
    );
  }
}
let NavBar = (Nav);
NavBar = connect(state=>({
	users: state.users
}),{login,goToPage})(NavBar);

export default NavBar;
