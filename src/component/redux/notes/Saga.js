import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
    CREATE_NOTE,
  
} from "./ActionTypes";
import { Service } from "../../service/Helper";
import {
    createNoteResponse,
  
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




function* notes() {
  yield takeEvery(CREATE_NOTE, createNotes);
 
}

export default notes;
