import initialState from "./initialState";
import axios from "axios";

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

Actions.createUser = ({ email, password, full_name }) => {
  return async (dispatch) => {
    // set redux state to loading while we wait for server response
    dispatch({ type: CREATE_USER });
    // create the url-encoded form data
    // set the request headers
    const headers = {
      "Content-Type": "application/json"
    };
    try {
      // make the actual HTTP request to our API
      const res = await axios({
        method: `POST`,
        url: `http://127.0.0.1:8000/api/v1/users/open`,
        data: { email: email, password: password, full_name: full_name },
        headers
      });
      console.log(res);
      // dispatch the success action
      return dispatch({ type: CREATE_USER_SUCCESS });
    } catch (error) {
      console.log(error);
      // dispatch the failure action
      return dispatch({ type: CREATE_USER_FAILURE, error: error.message });
    }
  };
};
