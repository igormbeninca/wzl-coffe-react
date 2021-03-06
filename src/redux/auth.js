import initialState from "./initialState";
import apiClient from "../services/apiClient";
import axios from "axios";

export const REQUEST_LOGIN = "@@auth/REQUEST_LOGIN";
export const REQUEST_LOGIN_FAILURE = "@@auth/REQUEST_LOGIN_FAILURE";
export const REQUEST_LOGIN_SUCCESS = "@@auth/REQUEST_LOGIN_SUCCESS";
export const REQUEST_LOG_USER_OUT = "@@auth/REQUEST_LOG_USER_OUT";

export const FETCHING_USER_FROM_TOKEN = "@@auth/FETCHING_USER_FROM_TOKEN";
export const FETCHING_USER_FROM_TOKEN_SUCCESS =
  "@@auth/FETCHING_USER_FROM_TOKEN_SUCCESS";
export const FETCHING_USER_FROM_TOKEN_FAILURE =
  "@@auth/FETCHING_USER_FROM_TOKEN_FAILURE";

export default function authReducer(state = initialState.auth, action = {}) {
  switch (action.type) {
    case REQUEST_LOGIN:
      return {
        ...state,
        isLoading: true
      };
    case REQUEST_LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        user: {}
      };
    case REQUEST_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null
      };
    case REQUEST_LOG_USER_OUT:
      return {
        ...initialState.auth
      };
    case FETCHING_USER_FROM_TOKEN:
      return {
        ...state,
        isLoading: true
      };
    case FETCHING_USER_FROM_TOKEN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        userLoaded: true,
        isLoading: false,
        user: action.data
      };
    case FETCHING_USER_FROM_TOKEN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        userLoaded: false,
        isLoading: false,
        error: action.error,
        user: {}
      };
    default:
      return state;
  }
}

export const Actions = {};
Actions.requestUserLogin = ({ rfid }) => {
  return async (dispatch) => {
    // set redux state to loading while we wait for server response
    dispatch({ type: REQUEST_LOGIN });
    // create the url-encoded form data
    const formData = new FormData();
    //formData.set("grant_type", "password");
    //formData.set("rfid", rfid);
    //formData.set("password", password);
    // set the request headers
    const headers = {
      "Content-Type": "application/json"
    };
    try {
      // make the actual HTTP request to our API
      const res = await axios({
        method: `POST`,
        url :
        process.env.NODE_ENV === "production"
          ? `https://studious-apex-330414.ey.r.appspot.com/api/v1/login/access-token-rfid`
          : `https://studious-apex-330414.ey.r.appspot.com/api/v1/login/access-token-rfid`,
        // url: `https://daring-glider-313211.ey.r.appspot.com/api/v1/login/access-token`,
        // //url: `http://192.168.0.185:8000/api/v1/login/access-token`,
        data: {rfid:rfid},
        headers
      });
      console.log(res);
      // stash the access_token our server returns
      const access_token = res.data.access_token;
      localStorage.setItem("access_token", access_token);
      // dispatch the success action
      dispatch({ type: REQUEST_LOGIN_SUCCESS });
      return dispatch(Actions.fetchUserFromToken(access_token));
    } catch (error) {
      //console.log(error);
      // dispatch the failure action
      return dispatch({ type: REQUEST_LOGIN_FAILURE, error: error.message });
    }
  };
};


Actions.requestUserLoginEmail = ({ email, password }) => {
  return async (dispatch) => {
    // set redux state to loading while we wait for server response
    dispatch({ type: REQUEST_LOGIN });
    // create the url-encoded form data
    const formData = new FormData();
    formData.set("grant_type", "password");
    formData.set("username", email);
    formData.set("password", password);
    // set the request headers
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
    try {
      // make the actual HTTP request to our API
      const res = await axios({
        method: `POST`,
        url :
        process.env.NODE_ENV === "production"
          ? `https://studious-apex-330414.ey.r.appspot.com/api/v1/login/access-token`
          : `https://studious-apex-330414.ey.r.appspot.com/api/v1/login/access-token`,
        // url: `https://daring-glider-313211.ey.r.appspot.com/api/v1/login/access-token`,
        // //url: `http://192.168.0.185:8000/api/v1/login/access-token`,
        data: formData,
        headers
      });
      console.log(res);
      // stash the access_token our server returns
      const access_token = res.data.access_token;
      localStorage.setItem("access_token", access_token);
      // dispatch the success action
      dispatch({ type: REQUEST_LOGIN_SUCCESS });
      return dispatch(Actions.fetchUserFromToken(access_token));
    } catch (error) {
      //console.log(error);
      // dispatch the failure action
      return dispatch({ type: REQUEST_LOGIN_FAILURE, error: error.message });
    }
  };
};





Actions.fetchUserFromToken = () => {
  return apiClient({
    url: `/users/me`,
    method: `GET`,
    adjustPath:false,
    types: {
      REQUEST: FETCHING_USER_FROM_TOKEN,
      SUCCESS: FETCHING_USER_FROM_TOKEN_SUCCESS,
      FAILURE: FETCHING_USER_FROM_TOKEN_FAILURE
    },
    options: {
      data: {},
      params: {}
    }
  });
};

// Actions.fetchUserFromToken = (access_token) => {
//   return async (dispatch) => {
//     dispatch({ type: FETCHING_USER_FROM_TOKEN });
//     const token = access_token
//       ? access_token
//       : localStorage.getItem("access_token");
//     const headers = {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`
//     };
//     try {
//       const res = await axios({
//         method: `GET`,
//         url: `http://127.0.0.1:8000/api/v1/users/me`,
//         headers
//       });
//       console.log(res.data);
//       return dispatch({
//         type: FETCHING_USER_FROM_TOKEN_SUCCESS,
//         data: res.data
//       });
//     } catch (error) {
//       console.log(error);
//       return dispatch({ type: FETCHING_USER_FROM_TOKEN_FAILURE, error });
//     }
//   };
// };

Actions.logUserOut = () => {
  localStorage.setItem("access_token", "");
  return { type: REQUEST_LOG_USER_OUT };
};
