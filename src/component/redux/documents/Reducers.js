import {
  CREATE_DOCUMENTS_RESPONSE,

} from "./ActionTypes";

const initialState = {
  error: "",
  createDocumentSuccessfully: "",
  
};

const documents = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_DOCUMENTS_RESPONSE:
      state = {
        ...state,
        createDocumentSuccessfully: action.payload,
      };
      break;
     
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default documents;
