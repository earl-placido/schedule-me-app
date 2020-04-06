import { combineReducers } from "redux";

import CreateGroupScreenReducer from "./actions/screens/CreateGroupScreen.action";
import LoginReducer from "./actions/components/login/Modal.action";
import AuthReducer from "./actions/Auth.action";
import AddAvailabilityReducer from "./actions/components/InputAvailabilityModal.action";
import GroupListScreenReducer from "./actions/screens/GroupListScreen.action";
import GroupScreenReducer from "./actions/screens/GroupScreen.action";
import NavigationBarReducer from "./actions/components/layout/NavigationBar.action";
import GroupCodeModalReducer from "./actions/components/GroupCodeModal.action";

export default combineReducers({
  CreateGroupScreenReducer,
  LoginReducer,
  auth: AuthReducer,
  GroupListScreenReducer,
  GroupScreenReducer,
  AddAvailabilityReducer,
  NavigationBarReducer,
  GroupCodeModalReducer
});
