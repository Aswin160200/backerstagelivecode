import {
    LOGIN_RESPONSE,
 
} from "./ActionTypes";

const initialState = {
  error: "",
  loginSuccessfull: "",
 };

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_RESPONSE:
      state = {
        ...state,
        loginSuccessfull: action.payload,
      };
      break;
 
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default login;
