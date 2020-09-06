import {
  GET_RESTAURANTS,
  CLEAR_RESTAURANT,
  RESTAURANT_ERROR,
  GET_RESTAURANT,
  UPDATE_RESTAURANT,
} from "../actions/types";

const initialState = {
  restaurants: [],
  restaurant: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_RESTAURANT:
    case UPDATE_RESTAURANT:
      return {
        ...state,
        restaurant: payload,
        loading: false,
      };

    case RESTAURANT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case GET_RESTAURANTS:
      return {
        ...state,
        restaurants: payload,
        loading: false,
      };
    case CLEAR_RESTAURANT:
      return {
        ...state,
        restaurant: null,
        loading: false,
      };

    default:
      return state;
  }
}
