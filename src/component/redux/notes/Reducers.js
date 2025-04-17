import {
    CREATE_NOTE_RESPONSE,
    GET_NOTE_BY_PROJECT_ID_RESPONSE,

} from "./ActionTypes";

const initialState = {
  error: "",
  createNotesSuccessfull: "",
  getNotesByProjectIDSuccessfull:"", 
  
};

const notes = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NOTE_RESPONSE:
      state = {
        ...state,
        createNotesSuccessfull: action.payload,
      };
      break;
      case GET_NOTE_BY_PROJECT_ID_RESPONSE:
        state = {
          ...state,
          getNotesByProjectIDSuccessfull: action.payload,
        };
        break;
     
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default notes;
