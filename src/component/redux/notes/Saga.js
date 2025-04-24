import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
    CREATE_NOTE,
    GET_NOTE_BY_PROJECT_ID,
    EDIT_NOTES,
} from "./ActionTypes";
import { Service } from "../../service/Helper";
import {
    createNoteResponse,
    getByProjectIdResponse,
    editNotesResponse,
} from "./Action";

function* createNotes({payload : createNote}) {
  try {
    const response = yield call(Service.commonFetch, 
    `notes`, 
    "POST",
    createNote, 
    null
    );
    yield put(createNoteResponse(response));
    console.log(response);
  } catch (error) {}
}

function* getNotesByProjectId({ payload: id }) {
  try {
    const response = yield call(
      Service.commonFetch,
      `/notes/project/${id}`,
      "GET",
      null
    );

    yield put(getByProjectIdResponse(response));
    console.log(response);
  } catch (error) {
    console.error("Update project failed:", error);
  }
}

function* editNotes({ payload }) {
  try {
    const { id, data } = payload;

    const response = yield call(
      Service.commonFetch,
      `/notes/${id}`,
      "PUT",
      data,
      null
    );

    yield put(editNotesResponse(response));
    console.log(response);
  } catch (error) {
    console.error("Update note failed:", error);
  }
}

function* notes() {
  yield takeEvery(CREATE_NOTE, createNotes);
  yield takeEvery(GET_NOTE_BY_PROJECT_ID, getNotesByProjectId);
  yield takeEvery(EDIT_NOTES, editNotes);
 
}

export default notes;
