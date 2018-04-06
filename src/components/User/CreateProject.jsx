import React from 'react'
import PropTypes from 'prop-types'
import {center} from '../../css/main.js'
import {storeDB} from '../../firebase'
import {connect} from 'react-redux'
import { getContests, submitProject, putProjectOnContest} from '../../actions/UsersActions'
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
import _ from 'lodash';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class CrProject extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      completed: false,
      progess:0,
      options : [],

      name: null,
      description: null,
      fullProject: null,
      contest: null,
    }
    this.handleName = this.handleName.bind(this);
    this.handleFullCont = this.handleFullCont.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleContest = this.handleContest.bind(this);
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.genOptions = this.genOptions.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleName = (e) => this.setState({name: e.target.value})
  handleFullCont = (e) => this.setState({ fullProject: e.target.files[0]})
  handleDescription = (e) => this.setState({description: e.target.value})
  handleContest = (e, { value }) => this.setState({ contest:value })
  handleOpen = () => this.setState({ completed: true })
  handleClose = () => this.setState({ completed: false, progress: 0 })

  genOptions = () =>{
    this.handleOpen();
    let opciones = [];
    let i = 0;
    _.map(this.props.users.liveContests, (p)=>{
      let o = { value: p.title, text: p.title, key:i };
     opciones.push(o);
     i+=1;
    })
    this.setState({ options: [...this.state.options, opciones] })
  }

  handleSubmit(){

    if (this.state.contest == null || this.state.name == null || this.state.description == null || this.state.fullProject == null)
      return;

    const file = this.state.fullProject;

    const storageRef = storeDB.ref(`usersPhotos/${file.name}`);
    const task = storageRef.put(file);
    task.on('state_changed', snapshot => {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      this.setState({ progress: progress });
      console.log('Upload is ' + progress + '% done');
    }, function (error) {
      console.log(error.message);
    }, () => {
      this.setState({ completed: true });
      let newProject = new Object();

      newProject.name = this.state.name;
      newProject.autor = this.props.users.userLogged.ID;
      newProject.shortDescription = this.state.description;
      newProject.fullProject = task.snapshot.downloadURL;
      newProject.points = 0;
      newProject.nPoints = 0;
      newProject.contest = this.state.contest.split(' ').join('_');
      newProject.ID = (this.state.name.split(' ')).join('_');
      newProject.photo = "https://firebasestorage.googleapis.com/v0/b/heatscore-7df3e.appspot.com/o/projectImage.png?alt=media&token=501acf02-a09f-4b26-a27e-c9aca6eb3daf";
      

      this.props.submitProject(newProject);
      this.props.putProjectOnContest(this.props.users.liveContests[newProject.contest],newProject.ID);
      setTimeout(() => { this.handleClose() }, 3000);
      
    });


  }


  renderForm() {
    return (<div style={{
        margin: "2%"
      }}>
      <Form size='large'>
        <Segment stacked>
          <Form.Input fluid icon='user outline' iconPosition='left' placeholder='Project Name' onChange={this.handleName}/>
          <Form.Input fluid icon='user' iconPosition='left' placeholder='Give our people a short description about your project' onChange={this.handleDescription}/>
          <Dropdown placeholder='Select Contest' fluid selection options={this.state.options[0]} onChange={this.handleContest}/>
          <br/>
          <Form.Group widths='equal'>
            <h3>Full Project</h3>
            <Form.Field fluid onChange={this.handleFullCont} control={Input} type="file"/>
          </Form.Group>
        </Segment>
      </Form>
    </div>)
  }

  render() {
    return (<Modal open={this.state.completed} trigger={<Button fluid onClick={()=>{this.genOptions()}} > Create new Project</Button>} size='small'>
      <Header icon='users' content='Create a new Project!'/>
      <Modal.Content>
        <center>
          {this.renderForm()}
        </center>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color='red' onClick={this.handleClose}>
          <Icon name='remove'/>
          Cancel
        </Button>
        <Button color='green' onClick={this.handleSubmit}>
          <Icon name='checkmark'/>
          Create
        </Button>
      </Modal.Actions>
    </Modal>);
  }
}

let CreateProject = (CrProject);
CreateProject = connect(state => ({
  users: state.users
}), { getContests, submitProject, putProjectOnContest})(CreateProject);

export default CreateProject;
