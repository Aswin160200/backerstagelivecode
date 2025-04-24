import {
    CREATE_NOTE,
    CREATE_NOTE_RESPONSE,
    EDIT_NOTES,
    EDIT_NOTES_RESPONSE,
    GET_NOTE_BY_PROJECT_ID,
    GET_NOTE_BY_PROJECT_ID_RESPONSE,

} from "./ActionTypes";

export const createNote = (createNote) => ({
  type: CREATE_NOTE,
  payload: createNote,
});

export const createNoteResponse = (createNoteResponse) => ({
  type: CREATE_NOTE_RESPONSE,
  payload: createNoteResponse,
});

export const getByProjectId = (getByProjectId) => ({
  type: GET_NOTE_BY_PROJECT_ID,
  payload: getByProjectId,
});

export const getByProjectIdResponse = (getByProjectIdResponse) => ({
  type: GET_NOTE_BY_PROJECT_ID_RESPONSE,
  payload: getByProjectIdResponse,
});

export const editNotesdata = (editNotes) => ({
  type: EDIT_NOTES,
  payload: editNotes,
});

export const editNotesResponse = (editNotesResponse) => ({
  type: EDIT_NOTES_RESPONSE,
  payload: editNotesResponse,
});