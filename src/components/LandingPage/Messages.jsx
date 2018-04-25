import React, { Component } from 'react';
import {connect} from 'react-redux';

class MessageContainer extends Component {
  render() {
    if(this.props.users.showMessage){
      <Message
        onDismiss={this.handleDismiss}
        header='Welcome back!'
        content='This is a special notification which you can dismiss.'
      />
    }
  }
}

let Messages = (MessageContainer);
Messages = connect(state =>({
  users:state.users
}))(Messages);


export default Messages;