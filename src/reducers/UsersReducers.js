import * as types from '../actions/constants';

export default function(state={},action){
  switch(action.type){
    case types.FETCH_USERS:
      return Object.assign({}, state, {
          users: action.payload
      });
    case types.LOG_IN_USER:
      return Object.assign({}, state, {
          userLogged: action.payload
      });
    case types.GO_TO_PAGE:
      return Object.assign({},state,{
        pageLoaded:action.payload
      })
    default:
      return state;
  }
}
