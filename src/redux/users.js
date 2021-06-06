import initalState from "./initialState";
import apiClient from "../services/apiClient";
export const FETCH_USERS = "@@users/FETCH_users";
export const FETCH_USERS_SUCCESS = "@@users/FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "@@users/FETCH_USERS_FAILURE";

export default function usersReducer(
  state = initalState.users,
  action = {}
) {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        isLoading: true,
        error: action.error
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        data: action.data,
        isLoading: false,
        error: null
      };
    case FETCH_USERS_FAILURE:
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

Actions.fetchUsers = () => {
  return apiClient({
    url: `/users/`,
    method: `GET`,
    adjustPath:true,
    types: {
      REQUEST: FETCH_USERS,
      SUCCESS: FETCH_USERS_SUCCESS,
      FAILURE: FETCH_USERS_FAILURE
    },
    options: {
      data: {},
      params: {}
    }
  });
};

