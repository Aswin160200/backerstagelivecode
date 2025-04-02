import {
  USERS_RESPONSE,
  ADD_USERS_RESPONSE,
  EDIT_USERS_RESPONSE,
  GET_BY_ID_RESPONSE,
  DELETE_USER_RESPONSE,
} from "./ActionTypes";

const initialState = {
  error: "",
  getAllUsersSuccessfull: "",
  addUsersSuccessfull: "",
  editUsersSuccessfull: "",
  getByUserIdSuccessfull: "",
  deleteUserIdSuccessfull: "",

};

const users = (state = initialState, action) => {
  switch (action.type) {
    case USERS_RESPONSE:
      state = {
        ...state,
        getAllUsersSuccessfull: action.payload,
      };
      break;
    case ADD_USERS_RESPONSE:
      state = {
        ...state,
        addUsersSuccessfull: action.payload,
      };
      break;
    case EDIT_USERS_RESPONSE:
      state = {
        ...state,
        editUsersSuccessfull: action.payload,
      };
      break;
    case GET_BY_ID_RESPONSE:
      state = {
        ...state,
        getByUserIdSuccessfull: action.payload,
      };
      break;
    case DELETE_USER_RESPONSE:
      state = {
        ...state,
        deleteUserIdSuccessfull: action.payload,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default users;
