import {
  database
} from '../firebase';
import * as types from './constants';

/**
 * This function will get all the users from db
 */
export function getUsers() {
  return dispatch => {
    database.ref('USERS/').on('value', data => {
      dispatch({
        type: types.FETCH_USERS,
        payload: data.val()
      })
    })
  }
}

/**
 * This function renders a project on screen
 * 
 * @param {Object} values refers to the project selected to be rendered
 */
export function renderProject(values) {
  return dispatch => {
    dispatch({
      type: types.DEF_PROJ_SEEN,
      payload: values
    })
  }
}

/**
 * This function renders a page selected
 * @param {String} page represents the page that will be Rendered
 */
export function goToPage(page) {
  if (page == types.SIGN_OUT) {
    return dispatch => {
      dispatch({
        type: types.SIGN_OUT,
        payload: null
      })
    }
  } else {
    return dispatch => {
      dispatch({
        type: types.GO_TO_PAGE,
        payload: page
      })
    }
  }
}

/**
 * This funcion will return an user from db
 * @param {Object} values representing the credentials of the user that wants to log in
 */
export function login(values) {
  if (!values) {
    goToPage(types.SIGN_OUT);
    return;
  }
  let userNameValues = values.ID ? (values.ID) : (values.userName);
  let pload = null;

  return dispatch => database.ref('USERS/' + userNameValues).once('value').then(
    (snapshot) => {
      if (snapshot.val() != null) {
        if (snapshot.val().password == values.password) {
          console.log("found");
          dispatch({
            type: types.LOG_IN_USER,
            payload: snapshot.val()
          })
        } else {
          console.log("Password Incorrect");
          return false;
        }
      } else {
        return false;
      }
    });
}
/**
 * This function will get the user's projects
 * 
 * @param {String} user represents the user ID to get its projects
 */
export function getProjects(user) {
  return dispatch => database.ref('PROJECTS/').orderByChild("autor").equalTo(user).on('value',
    (snapshot) => {
      dispatch({
        type: types.USER_PROJECTS,
        payload: snapshot.val()
      })
    })
}

/**
 * This function will register an user on db
 * 
 * @param {Object} values represents the object that will be inserted on DB
 */
export function signUpUser(values) {
  return dispatch => database.ref('USERS/' + values.ID).set(values).then(() => {
    database.ref('USERS/' + values.ID).once('value').then((snapshot) => {
      dispatch({
        type: types.LOG_IN_USER,
        payload: snapshot.val()
      })
    })
  });
}

/**
 * This function will update an user's information
 * 
 * @param {Object} values An object that has the information modified from an user
 */
export function updateUser(values) {
  var updates = {};
  updates['/USERS/' + values.ID] = values;

  return dispatch => database.ref().update(updates).then((snapshot) => {
    login(values)
  });
}

/**
 * This function will get the contests currently available
 */
export function getContests() {
  return dispatch => database.ref('CONTESTS').on('value', (snapshot) => {
    dispatch({
      type: types.GET_CONTESTS_FOR_USERS,
      payload: snapshot.val()
    })
  });
}

/**
 * This function will insert a new project into db
 * 
 * @param {Object} values An object that represents the new project
 */
export function submitProject(values) {
  return dispatch => database.ref('PROJECTS/' + values.ID).set(values);
}

/**
 *  This function will attach the new project into the contest chosen
 * 
 * @param {String} projectID Represents the project ID
 * @param {String} contest Represents the contest ID
 */
export function putProjectOnContest(contest, projectID) {
  let cont = contest;
  let x = cont.projectsRegistered.split(',');
  x.push(projectID);
  cont.projectsRegistered = x.join(',');
  var updates = {};
  updates['/CONTESTS/' + cont.ID] = cont;

  return dispatch => database.ref().update(updates);

}