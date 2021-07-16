import initialState from "./initialState";
// import axios from "axios";
import apiClient from "../services/apiClient";
export const CREATE_USER = "@@register/CREATE_USER";
export const CREATE_USER_FAILURE = "@@register/CREATE_USER_FAILURE";
export const CREATE_USER_SUCCESS = "@@register/CREATE_USER_SUCCESS";

export default function registerReducer(
  state = initialState.register,
  action = {}
) {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        isLoading: true
      };
    case CREATE_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        user: {}
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        user: action.data
      };
    default:
      return state;
  }
}

export const Actions = {};

// Actions.createUser = ({ email, password, full_name }) => {
//   return async (dispatch) => {
//     // set redux state to loading while we wait for server response
//     dispatch({ type: CREATE_USER });
//     // create the url-encoded form data
//     // set the request headers
//     const headers = {
//       "Content-Type": "application/json"
//     };
//     try {
//       // make the actual HTTP request to our API
//       const res = await axios({
//         method: `POST`,
//         url: `https://daring-glider-313211.ey.r.appspot.com/api/v1/users/open`,
//         data: { email: email, password: password, full_name: full_name },
//         headers
//       });
//       console.log(res);
//       // dispatch the success action
//       return dispatch({ type: CREATE_USER_SUCCESS });
//     } catch (error) {
//       console.log(error);
//       // dispatch the failure action
//       return dispatch({ type: CREATE_USER_FAILURE, error: error.message });
//     }
//   };
// };

Actions.createUser = ({ email, password, full_name, rfid }) => {
  return apiClient({
    url: `/users/open`,
    method: `POST`,
    adjustPath: false,
    types: {
      REQUEST: CREATE_USER,
      SUCCESS: CREATE_USER_SUCCESS,
      FAILURE: CREATE_USER_FAILURE
    },
    options: {
      data: { email: email, password: password, full_name: full_name, rfid:rfid },
      params: {}
    }
  });
};