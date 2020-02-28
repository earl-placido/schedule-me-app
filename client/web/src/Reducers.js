import { combineReducers } from 'redux';

import CreateGroupReducer from './actions/components/screens/CreateGroup.action';
import LoginReducer from './actions/components/screens/Login.action';

export default combineReducers({
    CreateGroupReducer,
    auth: LoginReducer
});