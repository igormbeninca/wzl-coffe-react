import initalState from "./initialState";
import apiClient from "../services/apiClient";
export const FETCH_USERS = "@@users/FETCH_users";
export const FETCH_USERS_SUCCESS = "@@users/FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "@@users/FETCH_USERS_FAILURE";

export const UPDATE_USER = "@@users/UPDATE_user";
export const UPDATE_USER_SUCCESS = "@@users/UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "@@users/UPDATE_USER_FAILURE";

export default function usersReducer(
  state = initalState.users,
  action = {}
) {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        isLoading: true,
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
    case UPDATE_USER:
      return {
        ...state,
        isLoading: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null
      }
    case UPDATE_USER_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.error
        }
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


Actions.updateUser = (user_id, user_form) => {
  return apiClient({
    url: `/users/${user_id}`,
    method: `PUT`,
    adjustPath:false,
    types: {
      REQUEST: UPDATE_USER,
      SUCCESS: UPDATE_USER_SUCCESS,
      FAILURE: UPDATE_USER_FAILURE
    },
    options: {
      data: {
        email:user_form.email,
        rfid:user_form.rfid,
        saldo:user_form.saldo,
        is_active:user_form.is_active,
        is_superuser:user_form.is_superuser,
        password:user_form.password,
        full_name:user_form.full_name
      },
      params: {}
    }
  });
};

