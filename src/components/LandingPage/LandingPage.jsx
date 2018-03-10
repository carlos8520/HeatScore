import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getUsers,signUpUser} from '../../actions/UsersActions';
import RegisterForm from './RegisterForm';
import NavBar from './NavBar';
import LogIn from './LogIn';

class LPage extends React.Component{
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    return (
      <div>
      <center>
        
      </center>
      </div>
    );
  }
}

let LandingPage = (LPage);
LandingPage = connect(state=>({
	users: state.users
}),{getUsers,signUpUser})(LandingPage);

export default LandingPage;
