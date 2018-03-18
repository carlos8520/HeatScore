import React from 'react';
import {connect} from 'react-redux';
import {getUsers,login} from '../actions/UsersActions';
import * as pages from '../actions/constants';
import RegisterForm from './LandingPage/RegisterForm';
import NavBar from './LandingPage/NavBar';
import LogIn from './LandingPage/LogIn';
import SignUp from './LandingPage/SignUp';
import UserProfile from './User/Profile';
import UserSettings from './User/Settings';
import ProjectDescription from './Projects/ProjectDescription';
import ForCompanies from './Companies/ForCompanies';
import CoSignUp from './Companies/CompaniesSignUp';

class HPage extends React.Component{

  componentDidMount() {
    this.props.getUsers();
    this.props.login(this.props.users.userLogged||{});
  }


  renderPage(){
    /*
    This funcion will render the page loaded
    */
    let pageLoaded = this.props.users.pageLoaded;
    if(!pageLoaded)
      return <RegisterForm notHeader={false}/>
    else if(pageLoaded == pages.LOG_IN_FORM)
      return <LogIn/>
    else if(pageLoaded == pages.SIGN_UP_FORM)
      return <SignUp/>
    else if(pageLoaded == pages.USER_PROFILE)
      return <UserProfile user={this.props.users.userLogged}/>
    else if(pageLoaded == pages.USER_SETTINGS)
      return <UserSettings />
    else if(pageLoaded == pages.RENDER_PROJ)
      return <ProjectDescription/>
    else if(pageLoaded == pages.FOR_COMPANIES)
      return <ForCompanies/>
    else if(pageLoaded == pages.CO_SIGN_UP)
      return <CoSignUp/>
  }

  render() {
    return (
      <div>
        <NavBar/>
        {
          this.renderPage()
        }
      </div>
    );
  }
}

let HomePage = (HPage);
HomePage = connect(state=>({
	users: state.users
}),{getUsers,login})(HomePage);

export default HomePage;
