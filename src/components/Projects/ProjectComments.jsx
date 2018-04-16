import React, { Component } from 'react'
import {Comment, Header, Form, Button } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {database} from '../../firebase'
import moment from 'moment';
import _ from 'lodash';

class PComments extends Component {
  constructor(){
    super();

    this.state={
      comments:[],

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
      autor: this.props.users.userLogged.fullName,
      photo: this.props.users.userLogged.photo,
      text: this.state.newComment,
      date: moment().format('L')
    }
    
    database.ref('COMMENTS/'+this.props.users.projectSeen.ID).push(comment);
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
          <Form reply>
            <Form.TextArea onChange={(e)=>{this.setState({newComment:e.target.value})}}/>
            <Button onClick={this.submitComment} content='Add Comment' labelPosition='left' icon='edit' primary />
          </Form>
        </Comment.Group>
      </div>
    );
  }
}

let ProjectComments = (PComments);
ProjectComments = connect(state => ({ users: state.users }), {})(ProjectComments);
export default ProjectComments;
