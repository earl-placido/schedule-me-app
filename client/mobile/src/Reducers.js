import {combineReducers} from 'redux';

import AuthReducer from './actions/components/Auth.action';
import CreateGroupReducer from './actions/screens/CreateGroup.action';
import GroupListReducer from './actions/screens/GroupList.action';
import GetGroupReducer from './actions/screens/GetGroup.action';
import GetGroupMembersReducer from './actions/screens/GetGroupMembers.action';
import InputAvailabilityReducer from './actions/InputAvailability.action';

export default combineReducers({
  CreateGroupReducer,
  InputAvailabilityReducer,
  GroupListReducer,
  GetGroupReducer,
  GetGroupMembersReducer,
  auth: AuthReducer,
});
