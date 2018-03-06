import {combineReducers} from 'redux';
import UsersReducers from './UsersReducers';

const rootReducer = combineReducers({
  users:UsersReducers
})

export default rootReducer;
