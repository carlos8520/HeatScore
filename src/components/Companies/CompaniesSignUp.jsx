import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {center} from '../../css/main.js';
import {storeDB} from '../../firebase';
import {registerCompany} from '../../actions/CompanyActions';
import {Modal,Icon,Form, Segment, Button, Input, TextArea, Grid, Header, Image, Message} from 'semantic-ui-react';

let PDF = null;
class CoSignUp extends React.Component {
  constructor(props){
    super(props);

    this.state={
      name:null,
      about:null,
      fullBio:null,
      email:null,
      password:null,

      passwordB:null,
      completed:true,
      modalOpen:false,
      passFail:false
    }
    this.handleFullName = this.handleFullName.bind(this);
    this.handleAbout = this.handleAbout.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleFullBio = this.handleFullBio.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handlePasswordB = this.handlePasswordB.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleUpload = this.handleUpload.bind(this);

    this.handleSignUp = this.handleSignUp.bind(this);
  }
  handleFullName = (e) => this.setState({name:e.target.value})
  handleAbout = (e) => this.setState({about:e.target.value})
  handleEmail = (e) => this.setState({email:e.target.value})
  handleFullBio = (e) => this.setState({fullBio:e.target.files[0]})
  handlePassword = (e) => this.setState({password:e.target.value})
  handlePasswordB = (e) => this.setState({passwordB:e.target.value})
  handleClose = () => this.setState({ modalOpen: false })

  handleSignUp(){
    console.log(this.state);
    if(this.state.name==null||this.state.about==null|| PDF==null||
      this.state.email==null||this.state.password==null||this.state.passwordB==null){
        this.setState({modalOpen:true});
        return;
      }
    if(this.state.password !== this.state.passwordB){
      this.setState({passFail:true});
    }

    let newUser = {
      name:this.state.name,
      about:this.state.about,
      fullBio:PDF,
      email:this.state.email,
      ID:this.state.email.split('@')[0],
      password:this.state.password,
    };

    this.props.registerCompany(newUser);
  }

  handleUpload(){
    const file = this.state.fullBio;

    const storageRef = storeDB.ref(`comPDF/${file.name}`);
    const task = storageRef.put(file);
    task.on('state_changed', snapshot => {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      this.setState({completed : false});
      console.log('Upload is ' + progress + '% done');
    }, function (error) {
      console.log(error.message);
    }, () => {
      this.setState({completed : true});
      PDF = task.snapshot.downloadURL;
      this.handleSignUp();
    });
  }

  modal(){
    return(
      <Modal
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
      >
        <Header as='h1' icon='list ul' content='Fill everything!' />
        <Modal.Content>
          <h3>Do not forget to fill every field!</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={this.handleClose} inverted>
            <Icon name='checkmark' /> Got it
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }


  renderSignUp(){
    return(
      <div style={{margin:"2%"}}>
        {this.modal()}
        <Form size='large'>
          <Segment stacked>
            <Form.Input
              fluid
              icon='user outline'
              iconPosition='left'
              placeholder='Company Name'
              onChange={this.handleFullName}
             />
           <Form.Input
             fluid
             icon='user'
             iconPosition='left'
             placeholder='e-Mail'
             onChange={this.handleEmail}
             />
            <Form.TextArea
                icon='user'
                placeholder='Tell us about your company'
                onChange={this.handleAbout}
              />
            <Form.Group widths='equal'>
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                error={this.state.passFail}
                onChange={this.handlePassword}
              />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Confirm Password'
                type='password'
                error={this.state.passFail}
                onChange={this.handlePasswordB}
              />
            </Form.Group>
              <Form.Field
                fluid
                onChange={this.handleFullBio}
                control={Input}
                type="file"
              />
            <Button color='orange' fluid size='large' onClick={this.handleUpload} >Sign-Up as a Company</Button>
          </Segment>
        </Form>
      </div>
      )
  }

  render () {
    return(
      <div className='login-form' style={center}> <br/><br/>
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 600 }}>
            <Header as='h2' color='orange' textAlign='center'>
              <Image src='https://goo.gl/z5vYiX' />
              {' '}Sign-Up and Start financing Projects!
            </Header>
            {this.renderSignUp()}
            <Message>
              Are you a partner already? Log-In!
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

let CompaniesSignUp = (CoSignUp);
CompaniesSignUp = connect(state=>({
	users: state.users
}),{registerCompany})(CompaniesSignUp);
export default CompaniesSignUp;
