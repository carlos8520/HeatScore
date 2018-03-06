import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getUsers,nuevoUsuario} from '../../actions/UsersActions';
import {database} from '../../firebase';

class LPage extends React.Component{
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUsers();
    console.log(this.props.users);
  }

  render() {
    return (
      <div>
        //NavBar Component

      </div>
    );
  }
}

let LandingPage = (LPage);
LandingPage = connect(state=>({
	users: state.users
}),{getUsers,nuevoUsuario})(LandingPage);

export default LandingPage;
