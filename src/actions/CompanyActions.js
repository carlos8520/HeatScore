import { database } from '../firebase';
import * as types from './constants';

export function registerCompany(values){
  return dispatch => database.ref('COMPANIES/'+values.ID).set(values).then(()=>{
    database.ref('COMPANIES/'+values.ID).once('value').then((snapshot)=>{
      dispatch({
        type: types.LOG_IN_USER,
        payload: snapshot.val()
      })
    })
  });

}
