import {
  database
} from '../firebase';
import * as types from './constants';

/** 
 * 
 * @param {Object} values An object with
 */
export function getProjectsToEvaluate() {
  return dispatch => database.ref('PROJECTS/').on('value',
    (snapshot) => {
      dispatch({
        type: types.FETCH_EV_PROJETS,
        payload: snapshot.val()
      })
    })
}