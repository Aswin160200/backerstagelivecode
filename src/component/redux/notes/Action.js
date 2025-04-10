import {
    CREATE_NOTE,
    CREATE_NOTE_RESPONSE,

} from "./ActionTypes";

export const createNote = (createNote) => ({
  type: CREATE_NOTE,
  payload: createNote,
});

export const createNoteResponse = (createNoteResponse) => ({
  type: CREATE_NOTE_RESPONSE,
  payload: createNoteResponse,
});
