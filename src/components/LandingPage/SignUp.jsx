import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Checkbox } from 'semantic-ui-react'
import RegisterForm from './RegisterForm';

export const center = {
	verticalAlign: 'middle',
	justifyContent: 'center',
	alignItems: 'center',
	marginTop: '15%'
};

const LoginForm = () => (
  <div className='login-form' style={center}>
    <Grid
      textAlign='center'
      style={{ height: '100%' }}
      verticalAlign='middle'
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='orange' textAlign='center'>
          <Image src='https://goo.gl/z5vYiX' />
          {' '}Sign-Up With Us
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
