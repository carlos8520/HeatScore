import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {Card, Image, Grid, Icon, Divider, Button, Modal, Header} from 'semantic-ui-react';
import {login, goToPage} from '../../actions/UsersActions';
import {CREATE_CONTEST} from '../../actions/constants';
import ProjectsEvaluate from './ProjectsEvaluate';

const ModalModalExample = () => (
  <Modal trigger={<Button positive massive="true">Grade Project 1</Button>}>
    <Modal.Header>Grade Project 1</Modal.Header>
    <Modal.Content image>
      <Modal.Description>
        <center>
          <Header>Default Profile Image</Header>
          <input type="number"placeholder="10"/>
        </center>
      </Modal.Description>
      <Modal.Actions>
      <Button basic color='red'>
        <Icon name='remove' /> Cancel
      </Button>
      <Button color='green'>
        <Icon name='checkmark' /> Send
      </Button>
    </Modal.Actions>
    </Modal.Content>
  </Modal>
)

class Profile extends React.Component {
  componentWillMount() {
  //  this.props.login(this.props.users.userLogged);
  }

  userCard(){
    return(
        <div>
          <Card>
          <Image src={this.props.user.photo}/>
           <Card.Content>
             <Card.Header>
               {this.props.user.fullName}
             </Card.Header>
             <Card.Meta>
               <span className='date'>
                 <a href={this.props.user.fullBio} target="_blank">
                   Full Bio
                 </a>
               </span>
             </Card.Meta>
             <Card.Description>
               Bio: {this.props.user.bio}
             </Card.Description>
           </Card.Content>
           <Card.Content extra>
             <a>
               <Icon name='mail' />
               email: {this.props.user.email}
             </a>
           </Card.Content>
         </Card>
         <Divider/>
        </div>
    );
  }

  render () {
    return(
      <div style={{margin:"1.5%"}}>
        <Grid>
          <Grid.Column width={4}>
            <center>
              {this.userCard()}
            </center>
          </Grid.Column>
          <Grid.Column width={12}>
            <h1>Projects to grade</h1>
            <ModalModalExample/>
            <ProjectsEvaluate/>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

let RevProfile = (Profile);
RevProfile = connect(state=>({
	users: state.users
}),{login,goToPage})(RevProfile);

export default RevProfile;
