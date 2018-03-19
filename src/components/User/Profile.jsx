import React, { Component, PropTypes } from 'react';
import {Card, Icon, Image, Grid, Rating, Transition} from 'semantic-ui-react';
import ProjectCard from '../Projects/ProjectCard';
import {goToPage, getProjects,login,renderProject} from '../../actions/UsersActions';
import {RENDER_PROJ} from '../../actions/constants';
import {connect } from 'react-redux';
import _ from 'lodash';
import CoProfile from '../Companies/CoProfile';
import UserProfile from './UserProfile';
import RevProfile from '../Reviewers/RevProfile';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    if(this.props.users.userLogged.type == "COMPANY"){
      return <CoProfile user={this.props.users.userLogged}/>
    }else if(this.props.users.userLogged.type == "REVIEWER"){
      return <RevProfile user={this.props.users.userLogged}/>
    }else{
      return <UserProfile user={this.props.users.userLogged}/>
    }
  }
}
let GeneralProfile = (Profile);
GeneralProfile = connect(state=>({
	users: state.users
}),{goToPage,getProjects, login})(GeneralProfile);

export default GeneralProfile;
