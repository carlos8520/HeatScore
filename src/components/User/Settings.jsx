import {connect} from 'react-redux';
import React, { Component, PropTypes } from 'react';
import {updateUser,login} from '../../actions/UsersActions';
import {Grid, Divider, Form, Input, TextArea, Button} from 'semantic-ui-react';

class Settings extends React.Component {
  constructor(props){
    super(props);

    this.state={
      fullName:null,
      bio:null,
      mail:null,
      age:null,
      password:null,
      passwordA:null,
      passwordNotEquals:false
    }
    this.handleFullName = this.handleFullName.bind(this);
    this.handleBio = this.handleBio.bind(this);
    this.handleMail = this.handleMail.bind(this);
    this.handleAge = this.handleAge.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handlePasswordA = this.handlePasswordA.bind(this);

    this.handleUpdate = this.handleUpdate.bind(this);
  }
  handleFullName = (e)=> this.setState({fullName:e.target.value})
  handleBio = (e)=> this.setState({bio:e.target.value})
  handleMail = (e)=> this.setState({mail:e.target.value})
  handleAge = (e)=> this.setState({age:e.target.value})
  handlePassword = (e)=> this.setState({password:e.target.value})
  handlePasswordA = (e)=> this.setState({passwordA:e.target.value})


  handleUpdate(){
    if(this.state.password !== this.state.passwordA) {
      this.setState({passwordNotEquals:true});
      return;
    }

    let userUpdated = this.props.users.userLogged;
    if(this.state.fullName) userUpdated.fullName = this.state.fullName;
    if(this.state.bio) userUpdated.bio = this.state.bio;
    if(this.state.mail) userUpdated.email = this.state.mail;
    if(this.state.age) userUpdated.age = this.state.age;
    if(this.state.password) userUpdated.password = this.state.password;
    this.props.updateUser(userUpdated);
  }

  renderForm(){
    return(
      <div>
        <Form>
         <Form.Field
           onChange={this.handleFullName}
           control={Input} label='Full Name'
           placeholder={this.props.users.userLogged.fullName} />
         <Form.Field
           onChange={this.handleBio}
           control={TextArea} label='Bio'
           placeholder={this.props.users.userLogged.bio} />
         <Form.Group widths='equal'>
           <Form.Field
             onChange={this.handleMail}
             control={Input} label='email'
             placeholder={this.props.users.userLogged.email} />
           <Form.Field
             onChange={this.handleAge}
             control={Input} type="number" label='Age'
             placeholder={this.props.users.userLogged.age} />
         </Form.Group>
         <Form.Group widths='equal'>
           <Form.Field
             onChange={this.handlePassword}
             control={Input} type="password"label='Password' placeholder='Password' />
           <Form.Field
             onChange={this.handlePasswordA}
             error={this.state.passwordNotEquals}
             control={Input} type="password"label='Password' placeholder='Write the password again' />
         </Form.Group>
         <Form.Field>
           <Button positive onClick={this.handleUpdate}>Update Profile</Button>
         </Form.Field>
       </Form>
      </div>
    );
  }

  render() {
    return (
      <div style={{margin:"1.5%"}}>
        <Grid columns={2}>
          <Grid.Column width={9 } >
            <h1>Public Profile</h1>
            <Divider/>
            {this.renderForm()}
          </Grid.Column>
          <Grid.Column width={5} >
            <h1>Right</h1>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

let UserSettings = (Settings);
UserSettings = connect(state=>({
	users: state.users
}),{updateUser,login})(UserSettings);


export default UserSettings;
