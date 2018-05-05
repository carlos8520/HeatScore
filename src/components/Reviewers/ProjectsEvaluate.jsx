import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getProjectsToEvaluate}  from '../../actions/EvaluatorActions';
import _ from 'lodash';
import {Table, Icon} from 'semantic-ui-react';

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
                        <Table.Cell><a href={project.fullProject}>Full Project</a></Table.Cell>
                        <Table.Cell>Rate</Table.Cell>

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