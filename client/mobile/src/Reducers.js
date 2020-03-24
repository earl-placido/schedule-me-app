import {combineReducers} from 'redux';

import AuthReducer from './actions/components/Auth.action';
import CreateGroupReducer from './actions/screens/CreateGroup.action';
import GroupListReducer from './actions/screens/GroupList.action';
import GroupDetailReducer from './actions/screens/GroupDetail.action';

export default combineReducers({
  auth: AuthReducer,
  CreateGroupReducer,
  GroupListReducer,
  GroupDetailReducer,
});
