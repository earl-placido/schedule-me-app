import {combineReducers} from 'redux';

import CreateGroupReducer from './actions/components/screens/CreateGroup.action';
import AuthReducer from './actions/components/Auth.action';

export default combineReducers({
  CreateGroupReducer,
  auth: AuthReducer,
});
