import initalState from "./initialState";
import apiClient from "../services/apiClient";
export const FETCH_PRODUCT = "@@product/FETCH_PRODUCT";
export const FETCH_PRODUCT_SUCCESS = "@@product/FETCH_PRODUCT_SUCCESS";
export const FETCH_PRODUCT_FAILURE = "@@product/FETCH_PRODUCT_FAILURE";

export default function productReducer(
  state = initalState.product,
  action = {}
) {
  switch (action.type) {
    case FETCH_PRODUCT:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        data: action.data,
        isLoading: false,
        error: null
      };
    case FETCH_PRODUCT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    default:
      return state;
  }
}
export const Actions = {};

Actions.fetchProducts = () => {
  return apiClient({
    url: `/product/`,
    method: `GET`,
    types: {
      REQUEST: FETCH_PRODUCT,
      SUCCESS: FETCH_PRODUCT_SUCCESS,
      FAILURE: FETCH_PRODUCT_FAILURE
    },
    options: {
      data: {},
      params: {}
    }
  });
};

