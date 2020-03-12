import { combineReducers } from "redux";

import CreateGroupReducer from "./actions/components/screens/CreateGroup.action";
import LoginReducer from "./actions/components/login/Modal.action";
import AuthReducer from "./actions/components/screens/Auth.action";
import AddAvailabilityReducer from "./actions/components/screens/InputAvailability.action";
import MainPageReducer from "./actions/components/screens/MainPage.action";
import GroupDetailReducer from "./actions/components/screens/GroupDetail.action";

export default combineReducers({
  CreateGroupReducer,
  LoginReducer,
  auth: AuthReducer,
  MainPageReducer,
  GroupDetailReducer,
  AddAvailabilityReducer
});
