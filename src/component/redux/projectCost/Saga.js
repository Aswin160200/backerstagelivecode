import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
    GET_ALL_PROJECTCOST,
    GET_PROJECTCOST_BY_PRODUCER_ID,
    GET_PROJECTCOST_BY_ID,
    EDIT_PROJECTCOST_BY_ID,
    ADD_NEW_PROJECT_COST,
} from "./ActionTypes";
import { Service } from "../../service/Helper";
import {
    getAllProjectCostResponse,
    getProjectCostByProducersIdResponse,
    getByProjectCostIdResponse,
    editByProjectCostIdResponse,
    addNewProjectCostResponse,
} from "./Action";

function* getAllProjectCostByProjectId({payload : id}) {
  try {
    const response = yield call(Service.commonFetch, `/projectscost/project/${id}`, "GET", null);
    yield put(getAllProjectCostResponse(response));
    console.log(response);
  } catch (error) {}
}

function* getAllProjectCostByProducerId({payload : id}) {
    try {
      const response = yield call(Service.commonFetch, `/projectscost/producer/${id}`, "GET", null);
      yield put(getProjectCostByProducersIdResponse(response));
      console.log(response);
    } catch (error) {}
  }


  function* getByProjectCostId({payload : id}) {
    try {
      const response = yield call(Service.commonFetch, `/projectscost/${id}`, "GET", null);
      yield put(getByProjectCostIdResponse(response));
      console.log(response);
    } catch (error) {}
  }


function* editByProjectCostId({ payload }) {
  try {
    const { id, data } = payload;

    const response = yield call(
      Service.commonFetch,
      `/projectscost/${id}`,
      "PUT",
      data,
      null
    );

    yield put(editByProjectCostIdResponse(response));
    console.log(response);
  } catch (error) {
    console.error("Update project failed:", error);
  }
}

function* createProjectCost({ payload: addNewProjectCost }) {
  try {
    const response = yield call(
      Service.commonFetch,
      "/projectscost",
      "POST",
      addNewProjectCost,
      null
    );
    yield put(addNewProjectCostResponse(response));
    console.log(response);
  } catch (error) {}
}


function* projectCost() {
  yield takeEvery(GET_ALL_PROJECTCOST, getAllProjectCostByProjectId);
  yield takeEvery(GET_PROJECTCOST_BY_PRODUCER_ID, getAllProjectCostByProducerId);
  yield takeEvery(GET_PROJECTCOST_BY_ID, getByProjectCostId);
  yield takeEvery(EDIT_PROJECTCOST_BY_ID, editByProjectCostId);
  yield takeEvery(ADD_NEW_PROJECT_COST, createProjectCost);

}

export default projectCost;
