import {
  PROJECTS_RESPONSE,
  CREATE_PROJECTS_RESPONSE,
  GET_PROJECTS_BY_ID_RESPONSE,
  UPDATE_PROJECTS_RESPONSE,
  GET_PROJECTS_BY_COPRODUCERSID_RESPONSE,
  GET_INVESTORS_BY_PROJECT_ID_RESPONSE,
  GET_PROJECT_BY_PRODUCER_ID_RESPONSE,
  CREATE_PARTYS_PROJECT_RESPONSE,
  GET_ALL_PARTYS_PROJECT_RESPONSE,
  GET_PARTYS_PROJECT_BY_ID_RESPONSE,
} from "./ActionTypes";

const initialState = {
  error: "",
  getAllProjectsSuccessfull: "",
  createProjectSuccessfull: "",
  getProjectByIdSuccessfull: "",
  updateProjectByIdSuccessfull: "",
  getprojectsBycoProducersId: "",
  getInvestorsByProjectId: "",
  getProjectbyProducerId: "",
  getCreatePartysProjectData: "",
  getAllPartysProjectListData: "",
  getPartysProjectByIdSusscessfull:"",
};

const projects = (state = initialState, action) => {
  switch (action.type) {
    case PROJECTS_RESPONSE:
      state = {
        ...state,
        getAllProjectsSuccessfull: action.payload,
      };
      break;
    case CREATE_PROJECTS_RESPONSE:
      state = {
        ...state,
        createProjectSuccessfull: action.payload,
      };
      break;
    case GET_PROJECTS_BY_ID_RESPONSE:
      state = {
        ...state,
        getProjectByIdSuccessfull: action.payload,
      };
      break;
    case UPDATE_PROJECTS_RESPONSE:
      state = {
        ...state,
        updateProjectByIdSuccessfull: action.payload,
      };
      break;
    case GET_PROJECTS_BY_COPRODUCERSID_RESPONSE:
      state = {
        ...state,
        getprojectsBycoProducersId: action.payload,
      };
      break;
    case GET_INVESTORS_BY_PROJECT_ID_RESPONSE:
      state = {
        ...state,
        getInvestorsByProjectId: action.payload,
      };
      break;
    case GET_PROJECT_BY_PRODUCER_ID_RESPONSE:
      state = {
        ...state,
        getProjectbyProducerId: action.payload,
      };
      break;
    case CREATE_PARTYS_PROJECT_RESPONSE:
      state = {
        ...state,
        getCreatePartysProjectData: action.payload,
      };
      break;
      case GET_ALL_PARTYS_PROJECT_RESPONSE:
        state = {
          ...state,
          getAllPartysProjectListData: action.payload,
        };
        break;
        case GET_PARTYS_PROJECT_BY_ID_RESPONSE:
          state = {
            ...state,
            getPartysProjectByIdSusscessfull: action.payload,
          };
          break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default projects;
