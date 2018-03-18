import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {Card, Image, Grid, Icon, } from 'semantic-ui-react';
import {login} from '../../actions/UsersActions';

class Profile extends React.Component {
  componentWillMount() {
  //  this.props.login(this.props.users.userLogged);
  }
  userCard(){
    return(
        <div>
          <Card>
           <Card.Content>
             <Card.Header>
               {this.props.user.name}
             </Card.Header>
             <Card.Meta>
               <span className='date'>
                 <a onClick={this.props.user.fullBio}>
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
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

let CoProfile = (Profile);
CoProfile = connect(state=>({
	users: state.users
}),{login})(CoProfile);

export default CoProfile;
