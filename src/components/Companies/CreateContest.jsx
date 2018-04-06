import React from 'react'
import PropTypes from 'prop-types'
import {center} from '../../css/main.js'
import {connect} from 'react-redux';
import {
  Modal,
  Icon,
  Grid,
  Header,
  Image,
  Message,
  Divider,
  Loader,
  Progress,
  Form,
  Segment,
  Button,
  Input
} from 'semantic-ui-react'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {submitContest} from '../../actions/CompanyActions';
import {storeDB} from '../../firebase';
import 'react-datepicker/dist/react-datepicker.css';

class CrContest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      completed: false,
      progress: 0,

      title: null,
      description: null,
      fullContest: null,
      closeDate: null
    }
    this.handleTitle = this.handleTitle.bind(this);
    this.handleFullCont = this.handleFullCont.bind(this);
    this.handleCloseDate = this.handleCloseDate.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleTitle = (e) => this.setState({title: e.target.value})
  handleFullCont = (e) => this.setState({fullContest: e.target.files[0]})
  handleCloseDate = (date) => this.setState({closeDate: date})
  handleDescription = (e) => this.setState({description: e.target.value})
  handleOpen = () => this.setState({completed: true})
  handleClose = () => this.setState({completed: false, progress:0})

  handleSubmit() {
    if (this.state.title == null || this.state.description == null || this.state.fullContest == null || this.state.closeDate == null)
      return;

    const file = this.state.fullContest;

    const storageRef = storeDB.ref(`usersPhotos/${file.name}`);
    const task = storageRef.put(file);
    task.on('state_changed', snapshot => {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      this.setState({progress: progress});
      console.log('Upload is ' + progress + '% done');
    }, function(error) {
      console.log(error.message);
    }, () => {
      this.setState({completed: true});
      let newContest = new Object();

      newContest.title = this.state.title;
      newContest.description = this.state.description;
      newContest.fullContest = task.snapshot.downloadURL;
      newContest.closeDate = this.state.closeDate._d.toDateString();
      newContest.company = this.props.users.userLogged.fullName;
      newContest.projectsRegistered = "";
      newContest.ID = (this.state.title.split(' ')).join('_');
      newContest.openDate = moment().format('L');

      this.props.submitContest(newContest);

      setTimeout(()=>{this.handleClose()},3000);

    });

  }

  renderForm() {
    return (<div style={{
        margin: "2%"
      }}>
      <Form size='large'>
        <Segment stacked>
          <Form.Input fluid icon='user outline' iconPosition='left' placeholder='Contest Name' onChange={this.handleTitle}/>
          <Form.Input fluid icon='user' iconPosition='left' placeholder='Give your participants a short description' onChange={this.handleDescription}/>
          <DatePicker onChange={this.handleCloseDate} placeholderText={'Click to select the Close Date'} selected={this.state.closeDate}/>
          <Form.Group widths='equal'>
            <h3>Full Contest
            </h3>
            <Form.Field fluid onChange={this.handleFullCont} control={Input} type="file" accept=".pdf, |images/*"/>
          </Form.Group>
        </Segment>
      </Form>
    </div>)
  }

  render() {
    return (<Modal trigger={<Button fluid onClick = {this.handleOpen} > Create new Contest</Button>} size='small' open={this.state.completed} onClose={this.handleClose}>
      <Header icon='trophy' content='Create a new contest!'/>
      <Modal.Content>
        <center>
          {this.renderForm()}
          <Progress percent={this.state.progress} indicating/>
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

let CreateContest = (CrContest);
CreateContest = connect(state => ({users: state.users}), {submitContest})(CreateContest);
export default CreateContest;
