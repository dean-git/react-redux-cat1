import { combineReducers } from "redux";
import products from "./components/product/connect/productReducer";
import user from "./components/login/connect/loginReducer";

export default combineReducers({
  products,
  user
});
