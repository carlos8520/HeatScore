import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getUsers,signUpUser} from '../../actions/UsersActions';
import * as pages from '../../actions/constants';
import RegisterForm from './RegisterForm';
import NavBar from './NavBar';
import LogIn from './LogIn';
import SignUp from './SignUp';

class LPage extends React.Component{
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUsers();
  }

  renderPage(){
    if(!this.props.users.pageLoaded)
      return <RegisterForm/>
    else if(this.props.users.pageLoaded == pages.LOG_IN_FORM)
      return <LogIn/>
    else if(this.props.users.pageLoaded == pages.SIGN_UP_FORM)
      return <SignUp/>
  }

  render() {
    return (
      <div>
      <center>
        <NavBar/>
        {
          this.renderPage()
        }
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
