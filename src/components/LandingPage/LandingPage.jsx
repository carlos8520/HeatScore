import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getUsers,signUpUser} from '../../actions/UsersActions';
import {database} from '../../firebase';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import NavBar from './NavBar';
class LPage extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      newUser:{
        password:null,
        fullName:null,
        email:null,
        reviewer:false,
      }
    }
    this.handleFullName = this.handleFullName.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleMail = this.handleMail.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleReviewer = this.handleReviewer.bind(this);
  }

  componentDidMount() {
    this.props.getUsers();
  }
  handleFullName(e){
    let userMod = this.state.newUser;
    userMod.fullName = e.target.value;
    this.setState({newUser:userMod});
  }
  handlePassword(e){
    let userMod = this.state.newUser;
    userMod.password = e.target.value;
    this.setState({newUser:userMod});
  }
  handleMail(e){
    let userMod = this.state.newUser;
    userMod.email = e.target.value;
    this.setState({newUser:userMod});
  }
  handleReviewer(e){
    let userMod = this.state.newUser;
    userMod.reviewer = !this.state.newUser.reviewer;
    this.setState({newUser:userMod});
    console.log(this.state.newUser);
  }
  handleRegister(e){
    /*
    * This funcion will sign up a new user into our database
    */
    let user = this.state.newUser;
    user.ID = user.email.split('@')[0]; //Will take just the username from email
    this.props.signUpUser(user);
    alert("User Registered");
  }

  newUserForm = () =>{
    return(
        <div>
          <Form>
            <Form.Field>
              <label>Full Name</label>
              <input id = "form_lading_fullName"placeholder='Full Name' onChange={this.handleFullName}/>
            </Form.Field>
            <Form.Field>
              <label>e-Mail</label>
              <input id = "form_lading_email" placeholder='e-Mail' type="email" onChange={this.handleMail}/>
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input id = "form_lading_password"  placeholder='Password' type="password" onChange={this.handlePassword}/>
            </Form.Field>
            <Form.Field>
              <Checkbox label='I want to be a reviewer' onChange={this.handleReviewer}/>
            </Form.Field>
            <Button type='submit' onClick={this.handleRegister}>Submit</Button>
          </Form>
        </div>
    )
  }

  render() {
    return (
      <div>
      <center>
        <NavBar/>
        <h1>Promote Your Projects, Finantiation, Show who you are!</h1>
        <h2>Hundreds of companies Hiring Projects!</h2>
        {this.newUserForm()}
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
