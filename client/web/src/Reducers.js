import { combineReducers } from "redux";

import CreateGroupReducer from "./actions/components/screens/CreateGroup.action";
import LoginModalReducer from "./actions/components/login/LoginModal.action";
import AuthReducer from "./actions/components/screens/Auth.action";
import MainPageReducer from "./actions/components/screens/MainPage.action";
import GroupDetailReducer from "./actions/components/screens/GroupDetail.action";

export default combineReducers({
  CreateGroupReducer,
  LoginModalReducer,
  auth: AuthReducer,
  MainPageReducer,
  GroupDetailReducer
});
