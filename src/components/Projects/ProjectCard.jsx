import React, { Component, PropTypes } from 'react';
import {Card, Icon, Image, Grid, Rating, Transition} from 'semantic-ui-react';
import {goToPage, getProjects,login,renderProject} from '../../actions/UsersActions';
import {RENDER_PROJ} from '../../actions/constants';
import {connect } from 'react-redux';
import _ from 'lodash';

class ProjectC extends Component{
  constructor(props){
    super(props);
    this.goToProject = this.goToProject.bind(this);
  }

  goToProject(){
    this.props.renderProject(this.props.project);
    this.props.goToPage(RENDER_PROJ);
  }
  render(){
    let grade = 5*(this.props.project.points/this.props.project.nPoints)/10;
    return(
      <Card>
        <a onClick={this.goToProject}>
          <Image src={this.props.project.photo} />
        </a>
        <Card.Content>
          <Card.Header>
            <a onClick={this.goToProject}>
              {this.props.project.name}
            </a>
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
let ProjectCard = (ProjectC);
ProjectCard = connect(state=>({
	users: state.users
}),{goToPage,getProjects, login, renderProject})(ProjectCard);

export default ProjectCard;
