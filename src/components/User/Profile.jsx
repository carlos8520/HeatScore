import React, { Component, PropTypes } from 'react';
import {Card, Icon, Image, Grid, Rating, Transition} from 'semantic-ui-react';
import ProjectCard from '../Projects/ProjectCard';
import {goToPage, getProjects,login,renderProject} from '../../actions/UsersActions';
import {RENDER_PROJ} from '../../actions/constants';
import {connect } from 'react-redux';
import _ from 'lodash';
import CoProfile from '../Companies/CoProfile';

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
      <div>
        <h1>My Projects</h1>
        <Card.Group>
          {
            _.map(this.props.users.userLoggedProjects,(p,i)=>{
              return(
                <Transition key={i} visible='show' animation='scale' duration={1000}>
                  <ProjectCard project={p} key={i}/>
                </Transition>
              )
            })
          }
        </Card.Group>
      </div>
    )
  }

  renderUser(){
    return (
      <div style={{margin:"1.5%"}}>
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
  renderCompany(){
    return(
      <CoProfile user={this.props.users.userLogged}/> 
    );
  }
  render() {
    if(this.props.users.userLogged.type == "COMPANY"){
      return this.renderCompany();
    }else{
      return this.renderUser();
    }
  }
}
let UserProfile = (Profile);
UserProfile = connect(state=>({
	users: state.users
}),{goToPage,getProjects, login})(UserProfile);

export default UserProfile;
