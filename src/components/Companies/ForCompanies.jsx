import React from 'react'
import PropTypes from 'prop-types'
import {Statistic, Icon, Image, Header, Divider, Button} from 'semantic-ui-react'

const TOP = () => (
  <center>
    <Image size="small" src="https://goo.gl/z5vYiX" circular />
    <Header as='h1' icon>
      <Header.Content>
        HeatScore
      </Header.Content>
    </Header>
  </center>
);
const Statistics = ()=>(
  <Statistic.Group widths='four'>
    <Statistic>
      <Statistic.Value>14</Statistic.Value>
      <Statistic.Label>Contests</Statistic.Label>
    </Statistic>

    <Statistic>
      <Statistic.Value text>
        Four
        <br />Hundred
      </Statistic.Value>
      <Statistic.Label>Signups</Statistic.Label>
    </Statistic>

    <Statistic>
      <Statistic.Value>
        <Icon name='comments' />
        39
      </Statistic.Value>
      <Statistic.Label>Reviewers</Statistic.Label>
    </Statistic>

    <Statistic>
      <Statistic.Value>
        <Icon name='unhide' />
        +263
      </Statistic.Value>
      <Statistic.Label>Projects</Statistic.Label>
    </Statistic>
  </Statistic.Group>
)


class Companies extends React.Component {
  constructor(props){
    super(props);
    this.state={
      appear : false
    }
  }


  render () {
    return(
      <div style={{margin:"5%"}}>
        <br/>
        <TOP/>
        <br/>
        <Statistics/>
        <br/>
        <br/>
        <Button fluid positive>Contact us!</Button>
      </div>
    )
  }
}

export default Companies;
