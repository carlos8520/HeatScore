import React, {Component, PropTypes} from 'react';
import {Menu, Header, Dropdown, Button, Image} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {login, goToPage} from '../../actions/UsersActions';
import {
  LOG_IN_FORM,
  SIGN_UP_FORM,
  USER_PROFILE,
  USER_SETTINGS,
  SIGN_OUT,
  FOR_COMPANIES,
  CURRENT_CONTESTS
} from '../../actions/constants';

const options = [
  {
    key: 'profile',
    text: 'Account',
    icon: 'user',
    value: USER_PROFILE
  }, {
    key: 'settings',
    text: 'Settings',
    icon: 'settings',
    value: USER_SETTINGS
  }, {
    key: 'sign-out',
    text: 'Sign Out',
    icon: 'sign out',
    value: SIGN_OUT
  }
]
class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'heatScore',
      user: null
    };

  }
  handleItemClick = (e, {name}) => this.setState({activeItem: name})
  handleGoToPage = (e, {value}) => this.props.goToPage(value)
/**

 userLogged: {
   ID: 'udc',
   bio: 'Universidad De Colima',
   email: 'udc@udc',
   fullBio: 'https://firebasestorage.googleapis.com/v0/b/heatscore-7df3e.appspot.com/o/comPDF%2FC%20-%20Tema%206.pdf?alt=media&token=8c21c726-8f85-4c1f-add8-27eb3653a1bc',
   name: 'UDC',
   password: 'udc',
   photo: 'https://firebasestorage.googleapis.com/v0/b/heatscore-7df3e.appspot.com/o/usersPhotos%2Flogo2.jpg?alt=media&token=d4b84596-9947-4084-8325-567c4ab8a793',
   type: 'COMPANY
*/
  trigger() {
    let userName = this.props.users.userLogged.fullName;
    let photo = this.props.users.userLogged.photo;
    return (<span>
      <Image avatar src={photo}/> {userName}
    </span>)
  }

  LogSign() {
    let usuario = this.props.users.userLogged;
    if (usuario) {
      return (<div >
        <Menu.Item>
          <Dropdown onChange={this.handleGoToPage} trigger={this.trigger()} options={options} pointing='top left'/>
        </Menu.Item>
      </div>)
    } else {
      return (<div>
        <Menu.Item>
          <Button.Group>
            <Button positive onClick={() => {
                this.props.goToPage(LOG_IN_FORM)
              }}>Log In</Button>
            <Button.Or/>
            <Button primary onClick={() => {
                this.props.goToPage(SIGN_UP_FORM)
              }}>Sign Up</Button>
          </Button.Group>
        </Menu.Item>
      </div>)
    }
  }

  secondOptions() {
    const {activeItem} = this.state;

    if (this.props.users.userLogged) {
      if (this.props.users.userLogged.type == "USER")
        return (<Menu.Item name='current Contests' active={activeItem === 'for Users'} onClick={() => {
            this.props.goToPage(CURRENT_CONTESTS)
          }}/>)
    } else {
      return (<Menu.Menu>
        <Menu.Item name='for Users' active={activeItem === 'for Users'} onClick={() => {
            this.props.goToPage(CURRENT_CONTESTS)
          }}/>
        <Menu.Item name='for Companies' active={activeItem === 'for Companies'} onClick={() => {
            this.props.goToPage(FOR_COMPANIES)
          }}/>
      </Menu.Menu>);
    }
  }

  render() {

    return (<div>
      <Menu size='small'>
        <Menu.Item>
          <Header as='h4' color="orange">
            <Image src="https://goo.gl/z5vYiX"/> {' '}HeatScore
          </Header>
        </Menu.Item>
        {this.secondOptions()}

        <Menu.Menu position='right'>
          {this.LogSign()}
        </Menu.Menu>
      </Menu>
    </div>);
  }
}
let NavBar = (Nav);
NavBar = connect(state => ({users: state.users}), {login, goToPage})(NavBar);

export default NavBar;
