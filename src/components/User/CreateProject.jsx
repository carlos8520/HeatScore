import React from 'react'
import PropTypes from 'prop-types'
import {center} from '../../css/main.js'
import {
  Modal,
  Icon,
  Grid,
  Header,
  Image,
  Message,
  Divider,
  Loader,
  Form,
  Segment,
  Button,
  Input,
  Dropdown
} from 'semantic-ui-react'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

const friendOptions = [
  {
    text: 'Contest 1',
    value: 'Contest 1'
  }, {
    text: 'Contest 2',
    value: 'Contest 2'
  }, {
    text: 'Contest 3',
    value: 'Contest 3'
  }
]

class CrProject extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      completed: false,

      name: null,
      description: null,
      fullContest: null,
      closeDate: null
    }
    this.handleName = this.handleName.bind(this);
    this.handleFullCont = this.handleFullCont.bind(this);
    this.handleCloseDate = this.handleCloseDate.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
  }
  handleName = (e) => this.setState({title: e.target.value})
  handleFullCont = (e) => this.setState({title: e.target.files[0]})
  handleCloseDate = (date) => this.setState({title: date})
  handleDescription = (e) => this.setState({title: e.target.value})

  renderForm() {
    return (<div style={{
        margin: "2%"
      }}>
      <Form size='large'>
        <Segment stacked="stacked">
          <Form.Input fluid="fluid" icon='user outline' iconPosition='left' placeholder='Project Name' onChange={this.handleName}/>
          <Form.Input fluid="fluid" icon='user' iconPosition='left' placeholder='Give our people a short description about your project' onChange={this.handleDescription}/>
          <Dropdown placeholder='Select Contest' fluid="fluid" selection="selection" options={friendOptions}/>
          <br/>
          <Form.Group widths='equal'>
            <h3>Full Project</h3>
            <Form.Field fluid="fluid" onChange={this.handleFullCont} control={Input} type="file"/>
          </Form.Group>
        </Segment>
      </Form>
    </div>)
  }

  render() {
    return (<Modal trigger={<Button fluid > Create new Project</Button>} size='small'>
      <Header icon='users' content='Create a new Project!'/>
      <Modal.Content>
        <center>
          {this.renderForm()}
        </center>
      </Modal.Content>
      <Modal.Actions>
        <Button basic="basic" color='red'>
          <Icon name='remove'/>
          Cancel
        </Button>
        <Button color='green'>
          <Icon name='checkmark'/>
          Create
        </Button>
      </Modal.Actions>
    </Modal>);
  }
}

export default CrProject;
