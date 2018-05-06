import React from 'react'
import PropTypes from 'prop-types'
import {Table, Header, Rating, Divider, Image, Popup} from 'semantic-ui-react'
import {connect} from 'react-redux'
import { getProjectsByContest, renderProject,goToPage} from '../../actions/UsersActions'
import _ from 'lodash'



class ContestFull extends React.Component {

  componentDidMount() {
    this.props.getProjectsByContest(this.props.users.contestSeen.ID);
  }  

  goToProject = (project) =>{
    this.props.renderProject(project);
    this.props.goToPage("RENDER_PROJ")
  }

  renderRow(project,i){
    let stars = 5*(project.points/project.nPoints)/10;
    let grade = project.evGrade != null ? project.evGrade : "Not graded yet";    
    console.log(grade);
    
    return(
      <Table.Row key={i}>
        <Table.Cell>
          <Header as='h3' textAlign='center'>{project.autor}</Header>
        </Table.Cell>
        <Table.Cell singleLine>
          <Popup
            trigger={
              <Header as='h5'>
                <a onClick={() => this.goToProject(project)}>{project.name}</a>
              </Header>            
            }
            content='See full project description'
          />
        </Table.Cell>
        <Table.Cell>
          <Rating icon='star' defaultRating={stars} maxRating={5} disabled/>
        </Table.Cell>
        <Table.Cell>
          {project.shortDescription}
        </Table.Cell>
        <Table.Cell>
          {grade}
        </Table.Cell>
      </Table.Row>
    )
  }

  render() {
    return (<div style={{
        margin: "2%"
      }}>
      <br/>
      <h1>{this.props.users.contestSeen.title} - Contest Description</h1>
      <Divider/>
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan='5'>Current Projects Registered</Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>Team</Table.HeaderCell>
            <Table.HeaderCell>Project Name</Table.HeaderCell>
            <Table.HeaderCell>Points</Table.HeaderCell>
            <Table.HeaderCell>Project Description</Table.HeaderCell>
            <Table.HeaderCell>Grade</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            _.map((this.props.users.contProjects),(project,i)=>{
              return this.renderRow(project,i)
            })
          }
        </Table.Body>
      </Table>
      <center>
        <Image.Group>
          <Image src='https://firebasestorage.googleapis.com/v0/b/heatscore-7df3e.appspot.com/o/plot1.png?alt=media&token=77b4f643-1faf-41c1-9684-55bdeb759efd' size='large' bordered />
          <Image src='https://firebasestorage.googleapis.com/v0/b/heatscore-7df3e.appspot.com/o/plot2.png?alt=media&token=24b380fb-9536-424f-abd0-dd6fc5aa1198' size='large' bordered />
        </Image.Group>
      </center>
      </div>)
  }
}

let FullContest = (ContestFull);
FullContest = connect(state => ({
  users: state.users
}), { getProjectsByContest, renderProject , goToPage})(FullContest);

export default FullContest;
