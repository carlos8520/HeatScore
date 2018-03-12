import React, { Component, PropTypes } from 'react';
import {Card, Icon, Image, Grid, Rating} from 'semantic-ui-react';
import {goToPage, getProjects,login} from '../../actions/UsersActions';
import {connect } from 'react-redux';
import _ from 'lodash';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  componentWillMount() {
    this.props.login(this.props.users.userLogged);
    this.props.getProjects(this.props.users.userLogged.ID);
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

  renderProjects(){
    return(
      <div> <br/>
        <h1>My Projects</h1>
        <Card.Group>
          {
            _.map(this.props.users.userLoggedProjects,(p,i)=>{
              return(
                <ProjectCard project={p} key={i}/>
              )
            })
          }
        </Card.Group>
      </div>
    )
  }

  render() {
    return (
      <div>
        <Grid>
          <Grid.Column width={4}>
            <center>
              {this.userCard()}
            </center>
          </Grid.Column>
          <Grid.Column width={12}>
            {this.renderProjects()}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
let UserProfile = (Profile);
UserProfile = connect(state=>({
	users: state.users
}),{goToPage,getProjects, login})(UserProfile);

export default UserProfile;

class ProjectCard extends Component{
  render(){
    let grade = 5*(this.props.project.points/this.props.project.nPoints)/10;
    return(
      <Card>
        <Image src={this.props.project.photo} />
        <Card.Content>
          <Card.Header>
            {this.props.project.name}
          </Card.Header>
          <Card.Meta>
           <span className='date'>
             {this.props.project.contest}
           </span>
         </Card.Meta>
          <Card.Description>
            {this.props.project.shortDescription}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Rating icon='star' defaultRating={grade} maxRating={5} disabled/>
        </Card.Content>
      </Card>
    )
  }
}
