import { combineReducers } from "redux";

import CreateGroupReducer from "./actions/screens/CreateGroupScreen.action";
import LoginReducer from "./actions/components/login/Modal.action";
import AuthReducer from "./actions/Auth.action";
import AddAvailabilityReducer from "./actions/components/InputAvailabilityModal.action";
import MainPageReducer from "./actions/screens/GroupListScreen.action";
import GroupDetailReducer from "./actions/screens/GroupScreen.action";
import NavigationBarReducer from "./actions/components/layout/NavigationBar.action";

export default combineReducers({
  CreateGroupReducer,
  LoginReducer,
  auth: AuthReducer,
  MainPageReducer,
  GroupDetailReducer,
  AddAvailabilityReducer,
  NavigationBarReducer
});
