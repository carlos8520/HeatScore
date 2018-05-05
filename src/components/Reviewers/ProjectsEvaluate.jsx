import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getProjectsToEvaluate,gradeProject}  from '../../actions/EvaluatorActions';
import _ from 'lodash';
import {Table, Icon, Modal, Button, Header} from 'semantic-ui-react';

class ProjectsTo extends Component {
  
  componentDidMount() {
    this.props.getProjectsToEvaluate(this.props.users.userLogged);
  }

  loadProjects = () => {
    return(
      <div>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Project Name</Table.HeaderCell>
              <Table.HeaderCell>Short Description</Table.HeaderCell>
              <Table.HeaderCell>Full Project</Table.HeaderCell>
              <Table.HeaderCell>Grade</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {
              _.map(this.props.users.evProjects, (project, i) => {
                if (project.evaluators) {
                  let evaluators = project.evaluators.split(',');
                  if (evaluators.indexOf(this.props.users.userLogged.ID) >= 0) {
                    return(
                      <Table.Row key={i}>
                        <Table.Cell>{project.name}</Table.Cell>
                        <Table.Cell>{project.shortDescription}</Table.Cell>
                        <Table.Cell><a target="_blank" href={project.fullProject}>Full Project</a></Table.Cell>
                        <Table.Cell><RateProject project={project}/></Table.Cell>

                      </Table.Row>
                    ) 
                  }
                }
              })
            }
          </Table.Body>
        </Table>
      </div>
    )
  }

  render() {
    return (
      <div>
        {
          this.loadProjects()
        }      
      </div>
    );
  }
}

let ProjectsEvaluate = (ProjectsTo);
ProjectsEvaluate = connect(state => ({
  users: state.users
}), { getProjectsToEvaluate })(ProjectsEvaluate);


export default ProjectsEvaluate;

class RatingProj extends Component{
  constructor(props) {
    super(props);
    
    this.state={
      grade:null,
      modalOpen : false,
    }

    this.handleGrade = this.handleGrade.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleGradeProject= this.handleGradeProject.bind(this);
  }
  handleOpen = () => this.setState({ modalOpen: true })
  handleClose = () => this.setState({ modalOpen: false })
  handleGrade = (e) =>{this.setState({grade:e.target.value})}
  
  handleGradeProject(){
    let updatedProject = this.props.project;
    updatedProject.evGrade = this.state.grade;

    this.props.gradeProject(updatedProject);
    this.setState({modalOpen:false})
  }

  render(){
    if(this.props.project.evGrade != null){
      return(
        <h1>{this.props.project.evGrade}</h1>
      )
    }else{
      return(
        <Modal
          trigger={<Button positive massive="true" onClick={this.handleOpen}>Grade Project</Button>}
          open={this.state.modalOpen}
          onClose={this.handleClose}
          size='small'
        >
          <Modal.Header>Grade Project -> {this.props.project.name}</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <center>
                <Header>Rate this project</Header>
                <input type="number" placeholder="5" onChange={this.handleGrade} max="10" min="0" />
              </center>
            </Modal.Description>
            <Modal.Actions>
              <Button basic color='red' onClick={this.handleClose}>
                <Icon name='remove' /> Cancel
              </Button>
              <Button color='green' onClick={this.handleGradeProject}>
                <Icon name='checkmark' /> Send
              </Button>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      );
    }
  }
}

let RateProject = (RatingProj);
RateProject = connect(state => ({
  users: state.users
}), { getProjectsToEvaluate, gradeProject })(RateProject);

