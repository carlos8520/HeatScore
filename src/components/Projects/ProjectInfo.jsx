import React, { Component } from 'react';
import {Image, Container, Header} from 'semantic-ui-react';
import {connect} from 'react-redux';
import "./info.css";

class Info extends Component {
  render() {
    return (
      <div className="container">
        <img className="ProjectPhoto" src={this.props.users.projectSeen.photo}/>
        <h1 className="ProjectName">{this.props.users.projectSeen.name}</h1>
        <p className="ProjectDescription">{this.props.users.projectSeen.shortDescription}</p>
      </div>
    );
  }
}

let ProjectInfo = (Info);
ProjectInfo = connect(state => ({ users: state.users }), {})(ProjectInfo);
export default ProjectInfo;