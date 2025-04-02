import {
    SUBSCRIPTION_RESPONSE,
  ADD_SUBSCRIPTION_RESPONSE,
  EDIT_SUBSCRIPTION_RESPONSE,
  GET_BY_ID_SUBSCRIPTION_RESPONSE,
  DELETE_SUBSCRIPTION_RESPONSE,
} from "./ActionTypes";

const initialState = {
  error: "",
  getAllSubscriptionSuccessfull: "",
  addSubscriptionSuccessfull: "",
  editSubscriptionSuccessfull: "",
  getBySubscriptionIdSuccessfull: "",
  deleteSubscriptionIdSuccessfull: "",

};

const subscription = (state = initialState, action) => {
  switch (action.type) {
    case SUBSCRIPTION_RESPONSE:
      state = {
        ...state,
        getAllSubscriptionSuccessfull: action.payload,
      };
      break;
    case ADD_SUBSCRIPTION_RESPONSE:
      state = {
        ...state,
        addSubscriptionSuccessfull: action.payload,
      };
      break;
    case EDIT_SUBSCRIPTION_RESPONSE:
      state = {
        ...state,
        editSubscriptionSuccessfull: action.payload,
      };
      break;
    case GET_BY_ID_SUBSCRIPTION_RESPONSE:
      state = {
        ...state,
        getBySubscriptionIdSuccessfull: action.payload,
      };
      break;
    case DELETE_SUBSCRIPTION_RESPONSE:
      state = {
        ...state,
        deleteSubscriptionIdSuccessfull: action.payload,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default subscription;
