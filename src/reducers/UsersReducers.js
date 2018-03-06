import {FETCH_USERS, FETCH_USER} from '../actions/UsersActions';

export default function(state=[],action){
  console.log(action.payload);
  switch(action.type){
    case FETCH_USERS:
      return action.payload;
    case FETCH_USER:
      return action.payload;
    default:
      return state;
  }
}
