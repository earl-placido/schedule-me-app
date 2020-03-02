import { combineReducers } from 'redux';

import CreateGroupReducer from './actions/components/screens/CreateGroup.action';
import LoginModalReducer from './actions/components/login/LoginModal.action'

export default combineReducers({
    CreateGroupReducer,
    LoginModalReducer
});