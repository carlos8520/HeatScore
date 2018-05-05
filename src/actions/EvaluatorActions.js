import {
  database
} from '../firebase';
import * as types from './constants';

/** 
 * 
 * This function will get the projects to evaluate for the evaluators
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

/**
 * 
 * @param {Object} values An objects which represents the project that will be updated
 */
export function gradeProject(values){
  let updates = {};
  updates['/PROJECTS/'+values.ID] = values;

  return dispatch => database.ref().update(updates);
}