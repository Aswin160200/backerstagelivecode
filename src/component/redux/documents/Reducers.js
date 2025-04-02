import {
    GET_ALL_DISTRIBUTIONS_RESPONSE,

} from "./ActionTypes";

const initialState = {
  error: "",
  getAllDistributionsData: "",
  
};

const distributions = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_DISTRIBUTIONS_RESPONSE:
      state = {
        ...state,
        getAllDistributionsData: action.payload,
      };
      break;
     
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default distributions;
