// import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { INVESTORS,EDIT_INVESTORS ,ADD_INVESTOR,GET_INVESTOR_BY_ID,GET_PROJECT_BY_INVESTORS_ID,GET_INVESTORS_BY_PRODUCER_ID} from "./ActionTypes";
import { Service } from "../../service/Helper";
import { getAllInvestorsResponse,editInvestorsResponse,addInvestorsResponse ,getInvestorByIdResponse,getProjectByInvestorsIdResponse,getInvestorsByProducersIdResponse} from "./Action";

function* getallInvestors() {
  try {
    const response = yield call(
      Service.commonFetch,
      "/investors",
      "GET",
      null
    );
    yield put(getAllInvestorsResponse(response));


  } catch (error) {

  }
}

function* editInvestors({payload }) {
  try {
    const { id, data } = payload;

    const response = yield call(
      Service.commonFetch,
      `/investors/${id}`,
      "PUT",
      data,
      null
    );
    yield put(editInvestorsResponse(response));
    console.log(response)

  } catch (error) {

  }
}

function* addInvestors({payload : addInvestors}) {
  try {
    const response = yield call(
      Service.commonFetch,
      "/investors",
      "POST",
      addInvestors,
      null
    );
    yield put(addInvestorsResponse(response));
    console.log(response)

  } catch (error) {

  }
}

function* getInvestorById({payload : investorId}) {
  try {
    const response = yield call(
      Service.commonFetch,
      `/investors/${investorId}`,
      "GET",
      null
    );
    yield put(getInvestorByIdResponse(response));
    console.log(response)

  } catch (error) {

  }
}

function* getProjectByInvestorsId() {
  try {
    const response = yield call(
      Service.commonFetch,
      "/projects",
      "GET",
      null
    );
    yield put(getProjectByInvestorsIdResponse(response));
    console.log(response)

  } catch (error) {

  }
}

function* getInvestorsByProducerId({payload :getInvestorbyProducerId}) {
  try {
    const response = yield call(
      Service.commonFetch,
      `/investors/producer/${getInvestorbyProducerId}`,
      "GET",
      null
    );
    yield put(getInvestorsByProducersIdResponse(response));
    console.log(response)

  } catch (error) {

  }
}

function* investors() {
  yield takeEvery(INVESTORS, getallInvestors);
  yield takeEvery(EDIT_INVESTORS, editInvestors);
  yield takeEvery(ADD_INVESTOR, addInvestors);
  yield takeEvery(GET_INVESTOR_BY_ID, getInvestorById);
  yield takeEvery(GET_PROJECT_BY_INVESTORS_ID, getProjectByInvestorsId);
  yield takeEvery(GET_INVESTORS_BY_PRODUCER_ID, getInvestorsByProducerId);

}

export default investors;
