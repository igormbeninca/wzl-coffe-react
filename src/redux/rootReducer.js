import { combineReducers } from "redux";
import authReducer from "./auth";
import machinesReducer from "./machines";
import purchaseReducer from "./purchase";
import registerReducer from "./register";
const rootReducer = combineReducers({
  auth: authReducer,
  machines: machinesReducer,
  purchase: purchaseReducer,
  register: registerReducer
  // other reducers will go here later
});
export default rootReducer;
