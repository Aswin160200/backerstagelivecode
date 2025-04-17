import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
    CREATE_NOTE,
    GET_NOTE_BY_PROJECT_ID,
  
} from "./ActionTypes";
import { Service } from "../../service/Helper";
import {
    createNoteResponse,
    getByProjectIdResponse,
  
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


function* notes() {
  yield takeEvery(CREATE_NOTE, createNotes);
  yield takeEvery(GET_NOTE_BY_PROJECT_ID, getNotesByProjectId);
 
}

export default notes;
