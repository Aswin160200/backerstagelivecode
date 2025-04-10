import {
    CREATE_NOTE_RESPONSE,

} from "./ActionTypes";

const initialState = {
  error: "",
  createNotesSuccessfull: "",
  
};

const notes = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NOTE_RESPONSE:
      state = {
        ...state,
        createNotesSuccessfull: action.payload,
      };
      break;
     
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default notes;
