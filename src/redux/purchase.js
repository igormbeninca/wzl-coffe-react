import initalState from "./initialState";
import apiClient from "../services/apiClient";
export const POST_PURCHASE = "@@purchase/POST_PURCHASE";
export const POST_PURCHASE_SUCCESS = "@@purchase/POST_PURCHASE_SUCCESS";
export const POST_PURCHASE_FAILURE = "@@purchase/POST_PURCHASE_FAILURE";
export const FETCH_PURCHASES = "@@purchase/FETCH_PURCHASES";
export const FETCH_PURCHASES_SUCCESS = "@@purchase/FETCH_PURCHASES_SUCCESS";
export const FETCH_PURCHASES_FAILURE = "@@purchase/FETCH_PURCHASES_FAILURE";

export default function purchaseReducer(
  state = initalState.purchase,
  action = {}
) {
  switch (action.type) {
    case POST_PURCHASE:
      return {
        ...state,
        isLoading: true
      };
    case POST_PURCHASE_SUCCESS:
      return {
        ...state,
        //data: action.data,
        isLoading: false,
        error: null
      };
    case POST_PURCHASE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case FETCH_PURCHASES:
      return {
        ...state,
        isLoading: true,
        error: action.error
      };
    case FETCH_PURCHASES_SUCCESS:
      return {
        ...state,
        data: action.data,
        isLoading: false,
        error: null
      };
    case FETCH_PURCHASES_FAILURE:
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

Actions.postPuchase = (new_purchase) => {
  return apiClient({
    url: `/purchase/`,
    method: `POST`,
    adjustPath:true,
    types: {
      REQUEST: POST_PURCHASE,
      SUCCESS: POST_PURCHASE_SUCCESS,
      FAILURE: POST_PURCHASE_FAILURE
    },
    options: {
      data: { new_purchase },
      params: {}
    }
  });
};

Actions.fetchPurchases = (init_date, end_date) => {
  const limit = 5000;
  return apiClient({
    url: `/purchase/`,
    method: `GET`,
    adjustPath:true,
    types: {
      REQUEST: FETCH_PURCHASES,
      SUCCESS: FETCH_PURCHASES_SUCCESS,
      FAILURE: FETCH_PURCHASES_FAILURE
    },
    options: {
      data: {},
      params: {limit, init_date, end_date}
    }
  });
};

Actions.fetchAllPurchases = (init_date, end_date) => {
  const limit = 5000;
  return apiClient({
    url: `/purchase/all`,
    method: `GET`,
    adjustPath:false,
    types: {
      REQUEST: FETCH_PURCHASES,
      SUCCESS: FETCH_PURCHASES_SUCCESS,
      FAILURE: FETCH_PURCHASES_FAILURE
    },
    options: {
      data: {},
      params: {limit, init_date, end_date}
    }
  });
};
