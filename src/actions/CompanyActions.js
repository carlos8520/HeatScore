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
