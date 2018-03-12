import React, { Component, PropTypes } from 'react';
import {Grid} from 'semantic-ui-react';

class Settings extends React.Component {
  static propTypes = {

  };
  render() {
    return (
      <div>
        <Grid columns={2}>
          <Grid.Column width={4}>
            <center>
              <h1>Left</h1>
            </center>
          </Grid.Column>
          <Grid.Column width={12}>
            <h1>Right-Mid</h1>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Settings;
