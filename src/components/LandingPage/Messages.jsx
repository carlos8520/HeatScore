import React, { Component } from 'react';
import {connect} from 'react-redux';
import { quitMessage} from '../../actions/UsersActions';
import {Message} from 'semantic-ui-react';  

class MessageContainer extends Component {
  constructor(){
    super();
  }
  handleDismiss = () => {
    this.props.quitMessage();
  }

  render() {
    if(this.props.users.showMessage){
      return(
        <div>
        <center>
          <Message 
            color={this.props.users.showMessage.color}
            onDismiss={this.handleDismiss}
          >
            <Message.Header>{this.props.users.showMessage.Title}</Message.Header>
            <p>{this.props.users.showMessage.content}</p>
          </Message>
        </center>
        </div>
      )
    }else{
      return(
        <div>
        </div>
      )
    }
  }
}

let Messages = (MessageContainer);
Messages = connect(state =>({
  users:state.users
}), { quitMessage })(Messages);


export default Messages;