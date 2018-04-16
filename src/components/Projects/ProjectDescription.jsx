import React from 'react'
import {connect} from 'react-redux'
import {Container, Image, Header, Button, Tab, Divider} from 'semantic-ui-react'
import ProjectComments from './ProjectComments'
import ProjectPDF from './ProjectPDF'
import ProjectInfo from './ProjectInfo';
//.projectSeen

class PDescription extends React.Component {  
  render () {
    const panes = [
      { menuItem: 'Project Information', render: () => <Tab.Pane><ProjectInfo/></Tab.Pane> },
      { menuItem: 'Full Project', render: () => <Tab.Pane><ProjectPDF url={this.props.users.projectSeen.fullProject}/></Tab.Pane> },
      { menuItem: 'Discussion', render: () => <Tab.Pane><ProjectComments/></Tab.Pane>}
    ]

    return(
      <div style={{ margin: "1.5%" }}>
      <Header as='h1'>{this.props.users.projectSeen.name}</Header>
      <Divider/>
        <Tab panes={panes} /> 
      </div>
    );
  }
}

let ProjectDescription = (PDescription);
ProjectDescription = connect(state => ({ users: state.users }), {  })(ProjectDescription);
export default ProjectDescription;
