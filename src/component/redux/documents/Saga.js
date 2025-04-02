import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
    GET_ALL_DISTRIBUTIONS,
  
} from "./ActionTypes";
import { Service } from "../../service/Helper";
import {
    getAllDistributionsResponse,
  
} from "./Action";

function* getDocumentsByProjectID({payload : id}) {
  try {
    const response = yield call(Service.commonFetch, `/distributions/project/${id}`, "GET", null);
    yield put(getAllDistributionsResponse(response));
    console.log(response);
  } catch (error) {}
}




function* distributions() {
  yield takeEvery(GET_ALL_DISTRIBUTIONS, getDocumentsByProjectID);
 
}

export default distributions;
