import * as types from '../actions/constants';

export default function(state={},action){
  switch(action.type){
    case types.FETCH_USERS:
      return Object.assign({}, state, {
          users: action.payload
      });
    case types.LOG_IN_USER:
      return Object.assign({}, state, {
          userLogged: action.payload,
          pageLoaded: types.USER_PROFILE,
      });
    case types.USER_PROJECTS:
      return Object.assign({},state,{
        userLoggedProjects:action.payload
      })
    case types.SIGN_OUT:
      return Object.assign({},state,{
        userLogged: null,
        pageLoaded: null
      })
    case types.GO_TO_PAGE:
      return Object.assign({},state,{
        pageLoaded:action.payload
      })
    default:
      return state;
  }
}
