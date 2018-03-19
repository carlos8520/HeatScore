import React from 'react'
import PropTypes from 'prop-types'
import {center} from '../../css/main.js'
import {Modal, Icon,Grid, Header, Image, Message,Divider, Loader, Form, Segment, Button, Input} from 'semantic-ui-react'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class CrContest extends React.Component {
  constructor(props){
    super(props);

    this.state={
      completed:false,

      title:null,
      description:null,
      fullContest:null,
      closeDate:null,
    }
    this.handleTitle = this.handleTitle.bind(this);
    this.handleFullCont = this.handleFullCont.bind(this);
    this.handleCloseDate = this.handleCloseDate.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
  }
  handleTitle = (e) => this.setState({title:e.target.value})
  handleFullCont = (e) => this.setState({title:e.target.files[0]})
  handleCloseDate = (date) => this.setState({title:date})
  handleDescription = (e) => this.setState({title:e.target.value})

  renderForm(){
    return(
      <div style={{margin:"2%"}}>
        <Form size='large'>
          <Segment stacked>
            <Form.Input
              fluid
              icon='user outline'
              iconPosition='left'
              placeholder='Contest Name'
              onChange={this.handleTitle}
             />
           <Form.Input
             fluid
             icon='user'
             iconPosition='left'
             placeholder='Give your participants a short description'
             onChange={this.handleDescription}
             />
           <Form.Group widths='equal'>
             <h3>Full Description </h3>
             <Form.Field
               fluid
               onChange={this.handleFullCont}
               control={Input}
               type="file"
               />
           </Form.Group>
           <DatePicker
             onChange={this.handleCloseDate}
             placeholderText='Click to select the Close Date'
             />
          </Segment>
        </Form>
      </div>
      )
  }


  render () {
    return(
      <Modal trigger={<Button fluid>Create new Contest</Button>} size='small'>
        <Header icon='trophy' content='Create a new contest!' />
        <Modal.Content>
          <center>
            {this.renderForm()}
          </center>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color='red'>
            <Icon name='remove' /> Cancel
          </Button>
          <Button color='green'>
            <Icon name='checkmark' /> Create
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default CrContest;
