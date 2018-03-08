import { database } from '../firebase';
export const FETCH_USER = "FETCH_USER";
export const FETCH_USERS = "FETCH_USERS";
export const LOG_IN_USER = "LOG_IN_USER";

export function getUsers(){
  /**
   * This funcion will get all the users from db
   */
  return dispatch=>{
    database.ref('USERS/users').on('value', data=>{
      dispatch({
        type: FETCH_USERS,
        payload: data.val()
      })
    })
  }
}

export function getUser(values){
  /**
   *  This funcion will return an user from db
   */
  database.ref('USERS/users/'+values.userName).then((snapshot)=>{
    return snapshot.val()
  });
}

export function signUpUser(values){
  /**
   *  This function register an user on db
   */
  let root = values.reviewer? "reviewers":"users";

  return dispatch => database.ref('USERS/'+root+'/'+values.ID).set(values).then(()=>{
    database.ref('USERS/'+root+'/'+values.ID).once('value').then((snapshot)=>{
      dispatch({
        type: LOG_IN_USER,
        payload: snapshot.val()
      })
    })
  });
}
