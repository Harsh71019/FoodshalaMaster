import axios from "axios";
import {
  REGISTER_SUCCESS_ADMIN,
  REGISTER_FAIL_ADMIN,
  ADMIN_ERROR,
  ADMIN_LOADED,
  LOGIN_FAIL_ADMIN,
  LOGIN_SUCCESS_ADMIN,
  LOGOUT_ADMIN,
  CLEAR_RESTAURANT,
} from "./types";
import { setAlert } from "./alert";
import setAdminToken from "../utils/setAdminToken";

//Load Admin

export const loadAdmin = () => async (dispatch) => {
  if (localStorage.admintoken) {
    setAdminToken(localStorage.admintoken);
  }
  try {
    const res = await axios.get("/api/authadmins");
    dispatch({
      type: ADMIN_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ADMIN_ERROR,
    });
  }
};

//Register Admin

export const registerAdmin = ({ name, email, password }) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("/api/admins", body, config);
    dispatch({
      type: REGISTER_SUCCESS_ADMIN,
      payload: res.data,
    });
    dispatch(loadAdmin());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: REGISTER_FAIL_ADMIN,
    });
  }
};

//Admin Login

export const loginAdmin = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/authadmins", body, config);
    dispatch({
      type: LOGIN_SUCCESS_ADMIN,
      payload: res.data,
    });
    dispatch(loadAdmin());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LOGIN_FAIL_ADMIN,
    });
  }
};

export const logoutAdmin = () => (dispatch) => {
  dispatch({
    type: CLEAR_RESTAURANT,
  });
  dispatch({
    type: LOGOUT_ADMIN,
  });
};
