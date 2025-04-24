import {
  INVESTORS_RESPONSE,
  EDIT_INVESTORS_RESPONSE,
  ADD_INVESTOR_RESPONSE,
  GET_INVESTOR_BY_ID_RESPONSE,
  GET_PROJECT_BY_INVESTORS_ID_RESPONSE,
  GET_INVESTORS_BY_PRODUCER_ID_RESPONSE,
  DELETE_INVESTORS_RESPONSE,
} from "./ActionTypes";

const initialState = {
  error: "",
  getAllInvestorSuccessfull: "",
  getEditInvestorsDetails: "",
  getAddInvestorsDetails: "",
  getInvestorsByIdDetails: "",
  getProjectByInvestorsIdResponse: "",
  getInvestorsProducersIdSuccessfull: "",
  deleteInvestorsSuccessfull:"",
};

const investors = (state = initialState, action) => {
  switch (action.type) {
    case INVESTORS_RESPONSE:
      state = {
        ...state,
        getAllInvestorSuccessfull: action.payload,
      };
      break;
    case EDIT_INVESTORS_RESPONSE:
      state = {
        ...state,
        getEditInvestorsDetails: action.payload,
      };
      break;
    case ADD_INVESTOR_RESPONSE:
      state = {
        ...state,
        getAddInvestorsDetails: action.payload,
      };
      break;
    case GET_INVESTOR_BY_ID_RESPONSE:
      state = {
        ...state,
        getInvestorsByIdDetails: action.payload,
      };
      break;
    case GET_PROJECT_BY_INVESTORS_ID_RESPONSE:
      state = {
        ...state,
        getProjectByInvestorsIdResponse: action.payload,
      };
      break;
      case GET_INVESTORS_BY_PRODUCER_ID_RESPONSE:
      state = {
        ...state,
        getInvestorsProducersIdSuccessfull: action.payload,
      };
      break;
      case DELETE_INVESTORS_RESPONSE:
        state = {
          ...state,
          deleteInvestorsSuccessfull: action.payload,
        };
        break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default investors;
