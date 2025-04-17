import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { CREATE_DOCUMENTS } from "./ActionTypes";
import { Service } from "../../service/Helper";
import { createDocumetsResponse } from "./Action";

function* createDocuments({ payload: createDocumets }) {
  try {
    const response = yield call(
      Service.commonFetch,
      "/documents",
      "POST",
      createDocumets,
      null
    );
    yield put(createDocumetsResponse(response));
    console.log(response);
  } catch (error) {}
}

function* documents() {
  yield takeEvery(CREATE_DOCUMENTS, createDocuments);
}

export default documents;
