import axios from "axios";
import {
  GET_RESTAURANTS,
  CLEAR_RESTAURANT,
  RESTAURANT_ERROR,
  GET_RESTAURANT,
  UPDATE_RESTAURANT,
} from "./types";

import { setAlert } from "./alert";
//Get all Restaurant
export const getRestaurants = () => async (dispatch) => {
  dispatch({ type: CLEAR_RESTAURANT });
  try {
    const res = await axios.get("/api/menu");
    dispatch({
      type: GET_RESTAURANTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: RESTAURANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get Current Restaurant Owner By name

export const getCurrentRestaurant = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/menu/me");
    dispatch({
      type: GET_RESTAURANT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: RESTAURANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Create or Update Restaurant

export const createRestaurant = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/menu", formData, config);
    dispatch({
      type: GET_RESTAURANT,
      payload: res.data,
    });

    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

    if (!edit) {
      history.push("/dashboardadmin");
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: RESTAURANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add Menu Items

export const addItems = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("/api/menu/item", formData, config);
    dispatch({
      type: UPDATE_RESTAURANT,
      payload: res.data,
    });

    dispatch(setAlert("Menu Items Added", "success"));

    history.push("/dashboardadmin");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: RESTAURANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete Menu Items

export const deleteItems = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/menu/item/${id}`);
    dispatch({
      type: UPDATE_RESTAURANT,
      payload: res.data,
    });
    dispatch(setAlert("Item Removed", "success"));
  } catch (err) {
    dispatch({
      type: RESTAURANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get profiles by ID

export const getRestaurantById = (adminId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/menu/admin/${adminId}`);
    dispatch({
      type: GET_RESTAURANT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: RESTAURANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
