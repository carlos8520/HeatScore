import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getContests} from '../../actions/CompanyActions';
import _ from 'lodash';
import ContestCard from './ContestCard';

class Container extends Component {

  componentWillMount(){
    this.props.getContests(this.props.users.userLogged.fullName);
  }

  render() {
    return (
      <div>
        {
          _.map(this.props.users.companyContests,(c,i)=>{
            return(
              <ContestCard/>
            )
          })
        }
      </div>
    );
  }
}

let ContestContainer = (Container);
ContestContainer = connect(state => ({users: state.users}), {getContests})(ContestContainer);
export default ContestContainer;
