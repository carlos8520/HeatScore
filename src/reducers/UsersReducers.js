import * as types from '../actions/constants';

export default function(state={},action){
  switch(action.type){
    case types.FETCH_USERS:
      return Object.assign({}, state, {
          users: action.payload
      });
    case types.LOG_IN_USER:
      return Object.assign({}, state, {     //no estoy cambiando el state si no que solo estoy
          userLogged: action.payload,     // asignando lo que necesito, y con el Object.Assign
          pageLoaded: types.USER_PROFILE, // Creo un objeto del estado y las nuevas propiedades
      });
    case types.USER_PROJECTS:
      return Object.assign({},state,{
        userLoggedProjects:action.payload
      })
    case types.DEF_PROJ_SEEN:
      return Object.assign({},state,{
        projectSeen:action.payload
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
    case types.GET_CONTESTS:
      return Object.assign({},state,{
        companyContests:action.payload
      })
    case types.GET_CONTESTS_FOR_USERS:
      return Object.assign({},state,{
        liveContests:action.payload
      })
    case types.SHOW_MESSAGE:
      return Object.assign({},state,{
        showMessage:action.payload
      })
    default:
      return state;
  }
}
