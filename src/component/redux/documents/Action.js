import {
  CREATE_DOCUMENTS,
  CREATE_DOCUMENTS_RESPONSE,
   
} from "./ActionTypes";

export const createDocumetsFiles = (createDocumets) => ({
  type: CREATE_DOCUMENTS,
  payload: createDocumets,
});

export const createDocumetsResponse = (createDocumetsResponse) => ({
  type: CREATE_DOCUMENTS_RESPONSE,
  payload: createDocumetsResponse,
});
