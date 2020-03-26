import {combineReducers} from 'redux';

import CreateGroupReducer from './actions/screens/CreateGroup.action';
import AuthReducer from './actions/components/Auth.action';
import InputAvailabilityReducer from './actions/InputAvailability.action';

export default combineReducers({
  CreateGroupReducer,
  InputAvailabilityReducer,
  auth: AuthReducer,
});
