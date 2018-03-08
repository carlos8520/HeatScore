import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getUsers,signUpUser, getUser} from '../../actions/UsersActions';
import RegisterForm from './RegisterForm';
import NavBar from './NavBar';

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
        <NavBar/>
        <h1>Promote Your Projects, Finantiation, Show who you are!</h1>
        <h2>Hundreds of companies Hiring Projects!</h2>
        <RegisterForm/>
      </center>
      </div>
    );
  }
}

let LandingPage = (LPage);
LandingPage = connect(state=>({
	users: state.users
}),{getUsers,signUpUser,getUser})(LandingPage);

export default LandingPage;
