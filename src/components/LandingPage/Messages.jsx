import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Message} from 'semantic-ui-react';  

class MessageContainer extends Component {
  constructor(){
    super();

    this.state = {
      visible:true
    }
  }
  handleDismiss = () => {
    this.setState({ visible: false })
  }

  render() {
    if(this.props.users.showMessage && this.state.visible){
      return(
        <div>
        <center>
          <Message
          onDismiss={this.handleDismiss}
          header={this.props.users.showMessage.Title}
          content={this.props.users.showMessage.content}
          />
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
}))(Messages);


export default Messages;