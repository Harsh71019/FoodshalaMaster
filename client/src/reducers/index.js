import { combineReducers } from "redux";
import alert from "./alert";
import admin from "./admin"
import auth from './auth'
import restaurant from './restaurant';
import order from './order'

export default combineReducers({
  alert,
  admin,
  auth,
  restaurant,
  order,
});
