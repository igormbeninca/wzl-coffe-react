import { combineReducers } from "redux";
import authReducer from "./auth";
import machinesReducer from "./machines";
import purchaseReducer from "./purchase";
import registerReducer from "./register";
import productReducer from "./product";
import usersReducer from "./users"
const rootReducer = combineReducers({
  auth: authReducer,
  machines: machinesReducer,
  purchase: purchaseReducer,
  register: registerReducer,
  product : productReducer,
  users : usersReducer
  // other reducers will go here later
});
export default rootReducer;
