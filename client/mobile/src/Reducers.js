import {combineReducers} from 'redux';

import AuthReducer, {LOGOUT_SUCCESS} from './actions/components/Auth.action';
import CreateGroupReducer from './actions/screens/CreateGroup.action';
import GroupListReducer from './actions/screens/GroupList.action';
import GetGroupReducer from './actions/screens/GetGroup.action';
import GetGroupMembersReducer from './actions/screens/GetGroupMembers.action';
import InputAvailabilityReducer from './actions/InputAvailability.action';
import AddGroupMemberReducer from './actions/screens/AddGroupMember.action';
import GetOptimalMeetingTimeReducer from './actions/GetOptimalMeetingTime.action';

const appReducer = combineReducers({
  CreateGroupReducer,
  InputAvailabilityReducer,
  GroupListReducer,
  GetGroupReducer,
  GetGroupMembersReducer,
  AddGroupMemberReducer,
  GetOptimalMeetingTimeReducer,
  auth: AuthReducer,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_SUCCESS) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
