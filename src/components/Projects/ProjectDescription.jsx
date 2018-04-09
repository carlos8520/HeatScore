import React from 'react'
import {connect} from 'react-redux'
import {Container, Image, Header, Button, Tab, Divider} from 'semantic-ui-react'
import ProjectComments from './ProjectComments'
import ProjectPDF from './ProjectPDF'
//.projectSeen

class PDescription extends React.Component {  

  renderProjectInfo(){
    return(
      <div>
      <Image src={this.props.users.projectSeen.photo} size='small' verticalAlign='middle' />
      <Container>
        <Header as='h1'>{this.props.users.projectSeen.name}</Header>
        <p>{this.props.users.projectSeen.shortDescription}</p>
      </Container>
      </div>
    );
  }

  render () {
    const panes = [
      { menuItem: 'Project Information', render: () => <Tab.Pane>{this.renderProjectInfo()}</Tab.Pane> },
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
