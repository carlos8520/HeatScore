import React, { Component } from 'react';
import {Modal, Button, Header} from 'semantic-ui-react';

class ContestReviewers extends Component {
  renderReviewers(){
    return(
      <div>Reviewer1</div>
    )
  }
  render() {
    return (
      <div>
        <Modal trigger={<Button icon="user" content="My Evaluators" />}>
          <Modal.Header>Your Evaluators</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              {
                this.renderReviewers()
              }             
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default ContestReviewers;