import {
  REGISTER_SUCCESS_ADMIN,
  REGISTER_FAIL_ADMIN,
  ADMIN_ERROR,
  ADMIN_LOADED,
  LOGIN_FAIL_ADMIN,
  LOGIN_SUCCESS_ADMIN,
  LOGOUT_ADMIN,
  CLEAR_RESTAURANT,
} from "../actions/types";

const initialState = {
  admintoken: localStorage.getItem("admintoken"),
  isAuthenticatedAdmin: null,
  loadingAdmin: true,
  admin: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_LOADED:
      return {
        ...state,
        isAuthenticatedAdmin: true,
        loadingAdmin: false,
        admin: payload,
      };
    case REGISTER_SUCCESS_ADMIN:
    case LOGIN_SUCCESS_ADMIN:
      localStorage.setItem("admintoken", payload.admintoken);
      return {
        ...state,
        ...payload,
        isAuthenticatedAdmin: true,
        loadingAdmin: false,
      };
    case REGISTER_FAIL_ADMIN:
    case ADMIN_ERROR:
    case LOGIN_FAIL_ADMIN:
    case LOGOUT_ADMIN:
    case CLEAR_RESTAURANT:
      localStorage.removeItem("admintoken");
      return {
        ...state,
        admintoken: null,
        isAuthenticatedAdmin: false,
        loadingAdmin: false,
      };

    default:
      return state;
  }
}
