import initialState from "./initialState";
import apiClient from "../services/apiClient";
export const FETCH_MACHINES = "@@machines/FETCH_MACHINES";
export const FETCH_MACHINES_SUCCESS = "@@machines/FETCH_MACHINES_SUCCESS";
export const FETCH_MACHINES_FAILURE = "@@machines/FETCH_MACHINES_FAILURE";
export default function machinesReducer(
  state = initialState.machines,
  action = {}
) {
  switch (action.type) {
    case FETCH_MACHINES:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_MACHINES_SUCCESS:
      return {
        ...state,
        data: action.data,
        isLoading: false,
        error: null
      };
    case FETCH_MACHINES_FAILURE:
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

Actions.fetchMachines = () => {
  return apiClient({
    url: `/machine/`,
    method: `GET`,
    types: {
      REQUEST: FETCH_MACHINES,
      SUCCESS: FETCH_MACHINES_SUCCESS,
      FAILURE: FETCH_MACHINES_FAILURE
    },
    options: {
      data: {},
      params: {}
    }
  });
};
