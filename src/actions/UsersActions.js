import { database } from '../firebase';
export const FETCH_USER = "FETCH_USER";
export const FETCH_USERS = "FETCH_USERS";

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

export function nuevoUsuario(values){
  /**
   *  This function register an user on db
   */
  return dispatch => database.ref('USERS/users/'+values.username).set(values);
}
