import {
  GET_ALL_PROJECTCOST_RESPONSE,
  GET_PROJECTCOST_BY_PRODUCER_ID_RESPONSE,
  GET_PROJECTCOST_BY_ID_RESPONSE,
  EDIT_PROJECTCOST_BY_ID_RESPONSE,
} from "./ActionTypes";

const initialState = {
  error: "",
  getAllProjectCostData: "",
  getByProducersIdSuccessfull: "",
  getByProjectCostIdSuccessfull: "",
  editByProjectCostIdSuccessfull: "",
};

const projectCost = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PROJECTCOST_RESPONSE:
      state = {
        ...state,
        getAllProjectCostData: action.payload,
      };
      break;
    case GET_PROJECTCOST_BY_PRODUCER_ID_RESPONSE:
      state = {
        ...state,
        getByProducersIdSuccessfull: action.payload,
      };
      break;
    case GET_PROJECTCOST_BY_ID_RESPONSE:
      state = {
        ...state,
        getByProjectCostIdSuccessfull: action.payload,
      };
      break;
    case EDIT_PROJECTCOST_BY_ID_RESPONSE:
      state = {
        ...state,
        editByProjectCostIdSuccessfull: action.payload,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default projectCost;
