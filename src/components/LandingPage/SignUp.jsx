import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Checkbox } from 'semantic-ui-react'
import RegisterForm from './RegisterForm';
import {center} from '../../css/main.js';

const LoginForm = () => (
  <div className='login-form' style={center}> <br/><br/>
    <Grid
      textAlign='center'
      style={{ height: '100%' }}
      verticalAlign='middle'
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='orange' textAlign='center'>
          <Image src='https://goo.gl/z5vYiX' />
          {' '}Sign-Up and Join us!
        </Header>
        <RegisterForm notHeader={true}/>
        <Message>
          Do you have an acount? Log-In!
        </Message>
      </Grid.Column>
    </Grid>
  </div>
)

export default LoginForm
