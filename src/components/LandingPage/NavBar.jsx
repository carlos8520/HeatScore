import React, { Component, PropTypes } from 'react';
import {Menu, Header, Dropdown, Button, Image} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {login,goToPage} from '../../actions/UsersActions';
import {LOG_IN_FORM, SIGN_UP_FORM, USER_PROFILE, USER_SETTINGS, SIGN_OUT} from '../../actions/constants';

const options = [
  { key: 'profile', text: 'Account', icon: 'user' , value:USER_PROFILE},
  { key: 'settings', text: 'Settings', icon: 'settings', value:USER_SETTINGS },
  { key: 'sign-out', text: 'Sign Out', icon: 'sign out', value:SIGN_OUT },
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
  handleGoToPage = (e, {value}) => this.props.goToPage(value)

  trigger(){
    let userName = this.props.users.userLogged.fullName;
    let photo = this.props.users.userLogged.photo;
    return(
      <span>
        <Image avatar src={photo} /> {userName}
      </span>
    )
  }

  LogSign(){
    let usuario = this.props.users.userLogged;
    if(usuario){
      return(
        <div >
          <Menu.Item>
            <Dropdown
              onChange={this.handleGoToPage}
              trigger={this.trigger()}
              options={options}
              pointing='top left' />
          </Menu.Item>
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
          <Header as='h4' color ="orange">
            <Image src="https://goo.gl/z5vYiX" />
            {' '}HeatScore
          </Header>
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
