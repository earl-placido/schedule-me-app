import { combineReducers } from "redux";

import CreateGroupReducer from './actions/components/screens/CreateGroup.action';
import LoginModalReducer from './actions/components/login/LoginModal.action'
import AuthReducer from './actions/components/screens/Auth.action';
import UserReducer from './actions/components/generalQueries/user.action';
import AddAvailabilityReducer from './actions/components/screens/InputAvailability.action';

export default combineReducers({
    CreateGroupReducer,
    auth: AuthReducer,
    AddAvailabilityReducer,
    LoginModalReducer,
    UserReducer
});
