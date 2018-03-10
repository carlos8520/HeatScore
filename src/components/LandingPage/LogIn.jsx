import React, {Component} from 'react'
import {connect} from 'react-redux';
import {login} from '../../actions/UsersActions';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import {center} from '../../css/main.js';

class Login extends Component{
  constructor(props){
    super(props);
    this.state={
      user:null,
      password:null,
    };

    this.handleUserName = this.handleUserName.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
  }

  handleUserName = (e) => this.setState({user:e.target.value});
  handlePassword = (e) => this.setState({password:e.target.value});

  handleLogIn(){

    let user = {
      userName : this.state.user,
      password: this.state.password
    };

    this.props.login(user);
  }

  render(){
    return(
      <div className='login-form' style={center}> <br/><br/>
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='orange' textAlign='center'>
              <Image src='https://goo.gl/z5vYiX' />
              {' '}Log-in to your account
            </Header>
            <Form size='large'>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='E-mail address'
                  onChange={this.handleUserName}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  onChange={this.handlePassword}
                />

              <Button color='orange' fluid size='large' onClick={this.handleLogIn}>Login</Button>
              </Segment>
            </Form>
            <Message color='yellow'>
              New to us? Sign Up
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

let LogInForm = (Login);
LogInForm = connect(state=>({
	users: state.users
}),{login})(LogInForm);

export default LogInForm;
