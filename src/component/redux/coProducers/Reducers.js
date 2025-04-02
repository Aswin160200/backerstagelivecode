import {
    CO_PRODUCERS_RESPONSE,
  ADD_CO_PRODUCERS_RESPONSE,
  EDIT_CO_PRODUCERS_RESPONSE,
  GET_BY_COPRODUCER_ID_RESPONSE,
  DELETE_CO_PRODUCERS_RESPONSE,
  GET_PROJJECT_BY_COPRODUCERS_ID_RESPONSE,
  GET_COPRODUCER_BY_PRODUCER_ID_RESPONSE
} from "./ActionTypes";

const initialState = {
  error: "",
  getAllCoProducersSuccessfull: "",
  addCoProducersSuccessfull: "",
  editCoProducersSuccessfull: "",
  getByCoProducersIdSuccessfull: "",
  deleteCoProducersIdSuccessfull: "",
  getProjectByCoProducersId:"",
  getCoProducersByProducersId:"",

};

const coProducers = (state = initialState, action) => {
  switch (action.type) {
    case CO_PRODUCERS_RESPONSE:
      state = {
        ...state,
        getAllCoProducersSuccessfull: action.payload,
      };
      break;
    case ADD_CO_PRODUCERS_RESPONSE:
      state = {
        ...state,
        addCoProducersSuccessfull: action.payload,
      };
      break;
    case EDIT_CO_PRODUCERS_RESPONSE:
      state = {
        ...state,
        editCoProducersSuccessfull: action.payload,
      };
      break;
    case GET_BY_COPRODUCER_ID_RESPONSE:
      state = {
        ...state,
        getByCoProducersIdSuccessfull: action.payload,
      };
      break;
    case DELETE_CO_PRODUCERS_RESPONSE:
      state = {
        ...state,
        deleteCoProducersIdSuccessfull: action.payload,
      };
      break;
      case GET_PROJJECT_BY_COPRODUCERS_ID_RESPONSE:
        state = {
          ...state,
          getProjectByCoProducersId: action.payload,
        };
        break;
        case GET_COPRODUCER_BY_PRODUCER_ID_RESPONSE:
          state = {
            ...state,
            getCoProducersByProducersId: action.payload,
          };
          break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default coProducers;
