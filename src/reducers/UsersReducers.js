import {FETCH_USERS, FETCH_USER, LOG_IN_USER} from '../actions/UsersActions';

export default function(state={},action){
  switch(action.type){
    case FETCH_USERS:
      let usersFetched = state;
      usersFetched.users = action.payload;
      return usersFetched;
    case LOG_IN_USER:
      let newstate = state;
      newstate.userLogged = action.payload;
      return newstate;
    default:
      return state;
  }
}
