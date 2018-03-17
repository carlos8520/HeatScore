import {connect} from 'react-redux';
import {storeDB} from '../../firebase';
import React, { Component, PropTypes } from 'react';
import {updateUser,login,goToPage} from '../../actions/UsersActions';
import {Grid, Divider, Form, Input, TextArea, Button, Image,Loader, Segment} from 'semantic-ui-react';

let IMAGE = null;
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
      passwordNotEquals:false,
      completed:true,
      photo: null,
    }
    this.handleFullName = this.handleFullName.bind(this);
    this.handleBio = this.handleBio.bind(this);
    this.handleMail = this.handleMail.bind(this);
    this.handleAge = this.handleAge.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handlePasswordA = this.handlePasswordA.bind(this);
    this.handlePhoto = this.handlePhoto.bind(this);

    this.handleUpdate = this.handleUpdate.bind(this);
    this.uploadPhoto = this.uploadPhoto.bind(this);
  }
  handleFullName = (e)=> this.setState({fullName:e.target.value})
  handleBio = (e)=> this.setState({bio:e.target.value})
  handleMail = (e)=> this.setState({mail:e.target.value})
  handleAge = (e)=> this.setState({age:e.target.value})
  handlePassword = (e)=> this.setState({password:e.target.value})
  handlePasswordA = (e)=> this.setState({passwordA:e.target.value})
  handlePhoto = (e)=> this.setState({photo:e.target.files[0]})


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
    if(IMAGE != null) userUpdated.photo = IMAGE;
    console.log(userUpdated);
    this.props.updateUser(userUpdated);
    this.props.goToPage("USER_PROFILE");
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


  renderChangePhoto(){
    return(
      <div>
      <Segment>
        <Loader active={!this.state.completed}/>
        <Image src={this.props.users.userLogged.photo}/>
        <br/>
        <Form.Field
          onChange={this.handlePhoto}
          control={Input}
          fluid
          type="file"/>
        <Button fluid onClick={this.uploadPhoto}>Upload new image</Button>
      </Segment>
      </div>
    )
  }

  uploadPhoto(event) {
    /*
     * This function will upload a photo
     */
    const file = this.state.photo;
    console.log(file);
    const storageRef = storeDB.ref(`usersPhotos/${file.name}`);
    const task = storageRef.put(file);
    task.on('state_changed', snapshot => {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      this.setState({completed : false});
      console.log('Upload is ' + progress + '% done');
    }, function (error) {
      console.log(error.message);
    }, () => {
      this.setState({completed : true});
      IMAGE= task.snapshot.downloadURL;
      this.handleUpdate();
    });
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
            <h3>Profile Picture</h3>
            <Divider/>
            {this.renderChangePhoto()}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

let UserSettings = (Settings);
UserSettings = connect(state=>({
	users: state.users
}),{updateUser,login,goToPage})(UserSettings);


export default UserSettings;
