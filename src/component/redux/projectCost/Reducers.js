import {
  GET_ALL_PROJECTCOST_RESPONSE,
  GET_PROJECTCOST_BY_PRODUCER_ID_RESPONSE,
  GET_PROJECTCOST_BY_ID_RESPONSE,
  EDIT_PROJECTCOST_BY_ID_RESPONSE,
  ADD_NEW_PROJECT_COST_RESPONSE,
  DELETE_PROJECT_COST_RESPONSE,
} from "./ActionTypes";

const initialState = {
  error: "",
  getAllProjectCostData: "",
  getByProducersIdSuccessfull: "",
  getByProjectCostIdSuccessfull: "",
  editByProjectCostIdSuccessfull: "",
  addNewProjectCostSuccessfull:"",
  deleteProjectCostSuccessfull:"",
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
      case ADD_NEW_PROJECT_COST_RESPONSE:
      state = {
        ...state,
        addNewProjectCostSuccessfull: action.payload,
      };
      break;
      case DELETE_PROJECT_COST_RESPONSE:
        state = {
          ...state,
          deleteProjectCostSuccessfull: action.payload,
        };
        break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default projectCost;
