import {
  database
} from '../firebase';
import * as types from './constants';

export function registerCompany(values) {
  return dispatch => database.ref('USERS/' + values.ID).set(values).then(() => {
    database.ref('USERS/' + values.ID).once('value').then((snapshot) => {
      dispatch({
        type: types.LOG_IN_USER,
        payload: snapshot.val()
      })
    })
  });
}

export function submitContest(values){
  return dispatch => database.ref('CONTESTS/'+values.ID).set(values).then(()=>{
    database.ref('CONTESTS/' + values.ID).once('value').then((snapshot)=>{
      dispatch({
        type: types.CREATE_CONTEST,
        payload: snapshot.val()
      })
    })
  });
}

export function getContests(user){
  console.log("User = " + user);
  return dispatch => database.ref('CONTESTS/').orderByChild("company").equalTo(user).on('value',
    (snapshot) => {
      dispatch({
        type: types.GET_CONTESTS,
        payload: snapshot.val()
      })
    })
}
