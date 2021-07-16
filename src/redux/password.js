import initalState from "./initialState";
import apiClient from "../services/apiClient";
export const POST_RECOVER = "@@password/POST_RECOVER";
export const POST_RECOVER_SUCCESS = "@@password/POST_RECOVER_SUCCESS";
export const POST_RECOVER_FAILURE = "@@password/POST_RECOVER_FAILURE";

export const POST_RESET = "@@password/POST_RESET";
export const POST_RESET_SUCCESS = "@@password/POST_RESET_SUCCESS";
export const POST_RESET_FAILURE = "@@password/POST_RESET_FAILURE";


export default function passwordReducer(
  state = initalState.password,
  action = {}
) {
  switch (action.type) {
    case POST_RECOVER:
      return {
        ...state,
        isLoading: true
      };
    case POST_RECOVER_SUCCESS:
      return {
        ...state,
        data: action.data,
        isLoading: false,
        error: null
      };
    case POST_RECOVER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case POST_RECOVER:
      return {
        ...state,
        isLoading: true,
      };
    case POST_RESET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data : action.data,
        error: null
      };
    case POST_RESET_FAILURE:
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

Actions.postRecover = (form) => {
  return apiClient({
    url: `/password-recovery/${form.email}`,
    method: `POST`,
    adjustPath: false,
    types: {
      REQUEST: POST_RECOVER,
      SUCCESS: POST_RECOVER_SUCCESS,
      FAILURE: POST_RECOVER_FAILURE
    },
    options: {
      data: {},
      params: {}
    }
  });
};

Actions.postReset = (form) => {
  return apiClient({
    url: `/reset-password/`,
    method: `POST`,
    adjustPath: true,
    types: {
      REQUEST: POST_RESET,
      SUCCESS: POST_RESET_SUCCESS,
      FAILURE: POST_RESET_FAILURE
    },
    options: {
      data: {
        token:form.token,
        new_password:form.new_password
      },
      params: {}
    }
  });
};
