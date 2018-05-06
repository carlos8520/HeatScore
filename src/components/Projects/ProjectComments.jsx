import React, { Component } from 'react'
import {Comment, Header, Form, Button, Input } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {database} from '../../firebase'
import moment from 'moment';
import _ from 'lodash';

class PComments extends Component {
  constructor(){
    super();

    this.state={
      comments:[],

      author:null,
      newComment:null
    };

    this.submitComment = this.submitComment.bind(this);
  }

  componentDidMount() {
    database.ref('COMMENTS/'+this.props.users.projectSeen.ID).on('value',(snapshot)=>{
      this.setState({comments:snapshot.val()})
    })
  }
  
  submitComment(){
    let comment = {
      text: this.state.newComment,
      date: moment().format('L')
    }

    if(this.props.users.userLogged!=null){
      comment.autor = this.props.users.userLogged.fullName;
      comment.photo = this.props.users.userLogged.photo;
    }
    else{
      comment.autor = this.state.author;
      comment.photo = "https://goo.gl/QKKCXc";
    }
    
    database.ref('COMMENTS/'+this.props.users.projectSeen.ID).push(comment);

    this.renderForm = this.renderForm.bind(this);
  }

  renderForm(){
    if(this.props.users.userLogged == null){
      return(
        <Form reply>
          <Form.Field 
            control={Input}  
            onChange={(e) => { this.setState({ author: e.target.value }) }} 
            label="Name: "
          />
          <Form.TextArea 
            onChange={(e) => { this.setState({ newComment: e.target.value }) }} 
          />
          <Button onClick={this.submitComment} content='Add Comment' labelPosition='left' icon='edit' primary />
        </Form>
      )
    }
    else{
      return(
        <div>
          <Form.TextArea onChange={(e) => { this.setState({ newComment: e.target.value }) }} />
          <Button onClick={this.submitComment} content='Add Comment' labelPosition='left' icon='edit' primary />
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <Comment.Group>
          <Header as='h3' dividing>Comments</Header>
          {
            _.map(this.state.comments, (c, i) => {
              return(
                <Comment key={i}>
                  <Comment.Avatar src={c.photo}/>
                  <Comment.Content>
                    <Comment.Author as='a'>{c.autor}</Comment.Author>
                    <Comment.Metadata>
                      <div>{'      '}{c.date}</div>
                    </Comment.Metadata>
                    <Comment.Text>{c.text}</Comment.Text>
                  </Comment.Content>
                </Comment >
              )
            })  
          }
          {
            this.renderForm()
          }
        </Comment.Group>
      </div>
    );
  }
}

let ProjectComments = (PComments);
ProjectComments = connect(state => ({ users: state.users }), {})(ProjectComments);
export default ProjectComments;
