import React from 'react'
import PropTypes from 'prop-types'
import {Table, Header, Rating, Divider, Image} from 'semantic-ui-react'

class FullContest extends React.Component {
  render() {
    return (<div style={{
        margin: "2%"
      }}>
      <br/>
      <h1>{this.props.contest} - Contest Description</h1>
      <Divider/>
      <Table celled="celled" padded="padded">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan='5'>Current Projects Registered</Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell singleLine="singleLine">Team</Table.HeaderCell>
            <Table.HeaderCell>Project Name</Table.HeaderCell>
            <Table.HeaderCell>Points</Table.HeaderCell>
            <Table.HeaderCell>Consensus</Table.HeaderCell>
            <Table.HeaderCell>Project Description</Table.HeaderCell>
            <Table.HeaderCell>Grade</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Header as='h2' textAlign='center'>A</Header>
            </Table.Cell>
            <Table.Cell singleLine="singleLine">Power Output</Table.Cell>
            <Table.Cell>
              <Rating icon='star' defaultRating={3} maxRating={3}/>
            </Table.Cell>
            <Table.Cell textAlign='right'>
              80%
              <br/>
              <a href='#'>18 Comments</a>
            </Table.Cell>
            <Table.Cell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut faucibus justo, dapibus ultricies nisl. Donec vitae gravida sapien. Cras malesuada et odio a convallis. Nam sollicitudin eleifend dapibus. Nulla facilisi. Integer et ligula porttitor, pellentesque massa ac, imperdiet elit. Sed ornare enim et tristique ornare. Nulla tempor et ligula a convallis. Quisque at quam dui. Ut dictum in turpis non ultrices.
            </Table.Cell>
            <Table.Cell>
              6
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Header as='h2' textAlign='center'>B</Header>
            </Table.Cell>
            <Table.Cell singleLine="singleLine">Weight</Table.Cell>
            <Table.Cell>
              <Rating icon='star' defaultRating={3} maxRating={3}/>
            </Table.Cell>
            <Table.Cell textAlign='right'>
              100%
              <br/>
              <a href='#'>65 Comments</a>
            </Table.Cell>
            <Table.Cell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut faucibus justo, dapibus ultricies nisl. Donec vitae gravida sapien. Cras malesuada et odio a convallis. Nam sollicitudin eleifend dapibus. Nulla facilisi. Integer et ligula porttitor, pellentesque massa ac, imperdiet elit. Sed ornare enim et tristique ornare. Nulla tempor et ligula a convallis. Quisque at quam dui. Ut dictum in turpis non ultrices.
            </Table.Cell>
            <Table.Cell>
              4
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <center>
        <Image.Group>
          <Image src='https://firebasestorage.googleapis.com/v0/b/heatscore-7df3e.appspot.com/o/plot1.png?alt=media&token=77b4f643-1faf-41c1-9684-55bdeb759efd' size='large' bordered />
          <Image src='https://firebasestorage.googleapis.com/v0/b/heatscore-7df3e.appspot.com/o/plot2.png?alt=media&token=24b380fb-9536-424f-abd0-dd6fc5aa1198' size='large' bordered />
        </Image.Group>
      </center>
      </div>)
  }
}

export default FullContest;
