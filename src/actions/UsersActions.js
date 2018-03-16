import { database } from '../firebase';
import * as types from './constants';

export function goToAPI(){
  
}


export function getUsers(){
  /**
   * This funcion will get all the users from db
   */
  return dispatch=>{
    database.ref('USERS/users').on('value', data=>{
      dispatch({
        type: types.FETCH_USERS,
        payload: data.val()
      })
    })
  }
}

export function goToPage(page){
  if(page == types.SIGN_OUT){
    return dispatch=>{
      dispatch({
        type:types.SIGN_OUT,
        payload: null
      })
    }
  }
  else{
    return dispatch=>{
      dispatch({
        type: types.GO_TO_PAGE,
        payload: page
      })
    }
  }
}

export function login(values){
  let userNameValues = values.ID? (values.ID):(values.userName);

  /**
   *  This funcion will return an user from db
   */
   if(!values){
     goToPage(types.SIGN_OUT);
     return;
   }
   return dispatch =>{
    database.ref('USERS/users/'+userNameValues).once('value').then(
     (snapshot)=>{
      if(snapshot.val() != null){
        if(snapshot.val().password == values.password){
          console.log("found");
          dispatch({
            type: types.LOG_IN_USER,
            payload: snapshot.val()
          });
        }
        else {
          console.log("Password Incorrect");
          return false;
        }
      }
      else{
        console.log("User Not Found");
        return false;
      }
    });
  }
}

export function getProjects(user){
  return dispatch=>database.ref('PROJECTS/').orderByChild("autor").equalTo(user).on('value',
          (snapshot)=>{
            dispatch({
              type:types.USER_PROJECTS,
              payload:snapshot.val()
            })
          })
}

export function signUpUser(values){
  /**
   *  This function register an user on db
   */
  let root = values.reviewer? "reviewers":"users";

  return dispatch => database.ref('USERS/'+root+'/'+values.ID).set(values).then(()=>{
    database.ref('USERS/'+root+'/'+values.ID).once('value').then((snapshot)=>{
      dispatch({
        type: types.LOG_IN_USER,
        payload: snapshot.val()
      })
    })
  });
}

export function updateUser(values){
  /**
   * This function will update a user's information
   */
   var updates={};
   updates['/USERS/users/'+values.ID] = values;

   return dispatch => database.ref().update(updates).then((snapshot)=>{
     login(values)
   });
}
