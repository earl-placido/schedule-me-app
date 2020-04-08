import thunk from "redux-thunk";
import jwtDecode from "jwt-decode";
import { logout } from "./actions/Auth.action";
import { message } from "antd";

const checkTokenExpirationMiddleware = ({ dispatch }) => {
  return next => action => {
    const token = localStorage.getItem("token");
    if (token) {
      if (jwtDecode(token).exp < Date.now() / 1000) {
        dispatch(logout());
        message.info("Token expired. Logging you out.");
      }
    }
    next(action);
  };
};

let middlewares = [thunk, checkTokenExpirationMiddleware];

export default middlewares;
