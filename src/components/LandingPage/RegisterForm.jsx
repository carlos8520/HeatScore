import {connect} from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { Button, Checkbox, Form, Segment } from 'semantic-ui-react'
import {signUpUser} from '../../actions/UsersActions';

class RForm extends React.Component {
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
  }
  handleRegister(e){
    /*
    * This funcion will sign up a new user into our database
    */
    let user = this.state.newUser;
    user.ID = user.email.split('@')[0]; //Will take just the username from email
    this.props.signUpUser(user);
  }

  beautyForm(){
    return(
    <Form size='large'>
      <Segment stacked>
        <Form.Input
          fluid
          icon='user outline'
          iconPosition='left'
          placeholder='Full Name'
          onChange={this.handleFullName}
        />
        <Form.Input
          fluid
          icon='user'
          iconPosition='left'
          placeholder='E-mail address'
          onChange={this.handleMail}
        />
        <Form.Input
          fluid
          icon='lock'
          iconPosition='left'
          placeholder='Password'
          type='password'
          onChange={this.handlePassword}
        />
        <Form.Field>
          <Checkbox label='I want to be a reviewer' onChange={this.handleReviewer}/>
        </Form.Field>

      <Button color='orange' fluid size='large' onClick={this.handleRegister} >Sign-Up</Button>
      </Segment>
    </Form>
  )
}

  render() {
    if(this.props.notHeader)
      return(
          this.beautyForm()
      );
    else
      return (
        <div>
          <h1>Promote Your Projects, Finantiation, Show who you are!</h1>
          <h2>Hundreds of companies Hiring Projects!</h2>
          {this.beautyForm()}
        </div>
      );
  }
}


let RegisterForm = (RForm);
RegisterForm = connect(state=>({
	users: state.users
}),{signUpUser})(RegisterForm);

export default RegisterForm;
