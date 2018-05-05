import React from 'react'
import PropTypes from 'prop-types'
import ContestCard from '../Companies/ContestCard'
import {getContests} from '../../actions/CompanyActions'
import {connect} from 'react-redux';
import _ from 'lodash';

class CurrentC extends React.Component {

  componentDidMount() {
    this.props.getContests(null);
  }
  
  renderContests = () =>{
    return _.map(this.props.users.companyContests,(contest,i)=>{
      return(
        <ContestCard contest={contest} key={i}/>
      )
    })
  }
  
  render () {
    return(
      <div>
        <center>
          <h1>CurrentContests</h1>
          {
            this.renderContests()
          }
        </center>
      </div>
    )
  }
}

let CurrentContests = (CurrentC);
CurrentContests = connect(state => ({
  users: state.users
}), { getContests })(CurrentContests);

export default CurrentContests;
