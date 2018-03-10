import React, { Component, PropTypes } from 'react';
import {Card, Icon, Image, Grid} from 'semantic-ui-react';
import {goToPage} from '../../actions/UsersActions';
import {connect } from 'react-redux';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }
  userCard(){
    return(
        <div>
          <Card>
           <Image src={this.props.user.photo} />
           <Card.Content>
             <Card.Header>
               {this.props.user.fullName}
             </Card.Header>
             <Card.Meta>
               <span className='date'>
                 Age: {this.props.user.age}
               </span>
             </Card.Meta>
             <Card.Description>
               Bio: {this.props.user.bio}
             </Card.Description>
             <Card.Description>
               email: {this.props.user.email}
             </Card.Description>
           </Card.Content>
           <Card.Content extra>
             <a>
               <Icon name='user' />
               22 Friends
             </a>
           </Card.Content>
         </Card>
        </div>
    );
  }
  render() {
    return (
      <div>
        <Grid>
          <Grid.Column width={4}>
            {this.userCard()}
          </Grid.Column>
          <Grid.Column width={12}>
            <Image src='/assets/images/wireframe/paragraph.png' />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
let UserProfile = (Profile);
UserProfile = connect(state=>({
	users: state.users
}),{goToPage})(UserProfile);

export default UserProfile;
