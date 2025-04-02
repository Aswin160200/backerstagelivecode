import {
    GET_ALL_DISTRIBUTIONS_RESPONSE,
    GET_DISTRIBUTION_BY_PRODUCER_ID_RESPONSE,
    GET_DISRIBUTION_BY_ID_RESPONSE,
    EDIT_DISRIBUTION_BY_ID_RESPONSE,
} from "./ActionTypes";

const initialState = {
  error: "",
  getAllDistributionsData: "",
  getByProducersIdSuccessfull:"",
  getByDistributionIdSuccessfull:"",
  editByDistributionIdSuccessfull:"",
 
};

const distributions = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_DISTRIBUTIONS_RESPONSE:
      state = {
        ...state,
        getAllDistributionsData: action.payload,
      };
      break;
      case GET_DISTRIBUTION_BY_PRODUCER_ID_RESPONSE:
      state = {
        ...state,
        getByProducersIdSuccessfull: action.payload,
      };
      break;
      case GET_DISRIBUTION_BY_ID_RESPONSE:
        state = {
          ...state,
          getByDistributionIdSuccessfull: action.payload,
        };
        break;
        case EDIT_DISRIBUTION_BY_ID_RESPONSE:
            state = {
              ...state,
              editByDistributionIdSuccessfull: action.payload,
            };
            break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default distributions;
