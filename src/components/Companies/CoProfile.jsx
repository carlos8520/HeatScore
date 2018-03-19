import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import CreateContest from './CreateContest';
import {Card, Image, Grid, Icon, Divider, Button} from 'semantic-ui-react';
import {login, goToPage} from '../../actions/UsersActions';
import {CREATE_CONTEST} from '../../actions/constants';
import ContestCard from './ContestCard';

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
               {this.props.user.name}
             </Card.Header>
             <Card.Meta>
               <span className='date'>
                 <a href={this.props.user.fullBio} target="_blank">
                   Full Company
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
         <CreateContest/>
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
            <h1>My Contests</h1>
            <ContestCard/>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

let CoProfile = (Profile);
CoProfile = connect(state=>({
	users: state.users
}),{login,goToPage})(CoProfile);

export default CoProfile;
