import { combineReducers } from "redux";

import CreateGroupReducer from "./actions/components/screens/CreateGroup.action";
import LoginModalReducer from "./actions/components/login/LoginModal.action";
import AuthReducer from "./actions/components/screens/Auth.action";

export default combineReducers({
  CreateGroupReducer,
  LoginModalReducer,
  auth: AuthReducer
});
