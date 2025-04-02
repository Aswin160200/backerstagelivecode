import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
    GET_ALL_DISTRIBUTIONS,
    GET_DISTRIBUTION_BY_PRODUCER_ID,
    GET_DISRIBUTION_BY_ID,
    EDIT_DISRIBUTION_BY_ID
} from "./ActionTypes";
import { Service } from "../../service/Helper";
import {
    getAllDistributionsResponse,
    getByProducersIdResponse,
    getByDistributionIdResponse,
    editByDistributionIdResponse,
} from "./Action";

function* getAllDistributionsByProjectId({payload : id}) {
  try {
    const response = yield call(Service.commonFetch, `/distributions/project/${id}`, "GET", null);
    yield put(getAllDistributionsResponse(response));
    console.log(response);
  } catch (error) {}
}

function* getAllDistributionsByProducerId({payload : id}) {
    try {
      const response = yield call(Service.commonFetch, `/distributions/producer/${id}`, "GET", null);
      yield put(getByProducersIdResponse(response));
      console.log(response);
    } catch (error) {}
  }


  function* getByDistributionId({payload : id}) {
    try {
      const response = yield call(Service.commonFetch, `/distributions/${id}`, "GET", null);
      yield put(getByDistributionIdResponse(response));
      console.log(response);
    } catch (error) {}
  }


function* editByDistributionId({ payload }) {
  try {
    const { id, data } = payload;

    const response = yield call(
      Service.commonFetch,
      `/distributions/${id}`,
      "PUT",
      data,
      null
    );

    yield put(editByDistributionIdResponse(response));
    console.log(response);
  } catch (error) {
    console.error("Update project failed:", error);
  }
}
function* distributions() {
  yield takeEvery(GET_ALL_DISTRIBUTIONS, getAllDistributionsByProjectId);
  yield takeEvery(GET_DISTRIBUTION_BY_PRODUCER_ID, getAllDistributionsByProducerId);
  yield takeEvery(GET_DISRIBUTION_BY_ID, getByDistributionId);
  yield takeEvery(EDIT_DISRIBUTION_BY_ID, editByDistributionId);
}

export default distributions;
