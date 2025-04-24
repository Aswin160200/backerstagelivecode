import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  PROJECTS,
  CREATE_PROJECTS,
  GET_PROJECTS_BY_ID,
  UPDATE_PROJECTS,
  GET_PROJECTS_BY_COPRODUCERSID,
  GET_INVESTORS_BY_PROJECT_ID,
  GET_PROJECT_BY_PRODUCER_ID,
  CREATE_PARTYS_PROJECT,
  GET_ALL_PARTYS_PROJECT,
  GET_PARTYS_PROJECT_BY_ID,
  DELETE_PROJECT,
} from "./ActionTypes";
import { Service } from "../../service/Helper";
import {
  getAllProjectsResponse,
  createProjectsResponse,
  getProjectsByIDResponse,
  updateProjectsResponse,
  getProjectByCoProducersResponse,
  getInvestorsByProjectIdResponse,
  getProjectByProducerIdResponse,
  createPartysProjectResponse,
  getAllPartysProjectResponse,
  getPartisProjectByIDResponse,
  deleteProjectResponse,
} from "./Action";

function* getallProjects() {
  try {
    const response = yield call(Service.commonFetch, "/projects", "GET", null);
    yield put(getAllProjectsResponse(response));
    console.log(response);
  } catch (error) {}
}

function* createProject({ payload: createProjects }) {
  console.log("test", createProjects);
  try {
    const response = yield call(
      Service.commonFetch,
      "/projects",
      "POST",
      createProjects,
      null
    );
    yield put(createProjectsResponse(response));
    console.log(response);
  } catch (error) {}
}

function* getProjectsById({ payload: projectsByID }) {
  try {
    const response = yield call(
      Service.commonFetch,
      `/projects/${projectsByID}`,
      "GET",
      null
    );
    yield put(getProjectsByIDResponse(response));
    console.log(response);
  } catch (error) {}
}

function* updateProject({ payload }) {
  try {
    const { id, data } = payload;

    const response = yield call(
      Service.commonFetch,
      `/projects/${id}`,
      "PUT",
      data,
      null
    );

    yield put(updateProjectsResponse(response));
    console.log(response);
  } catch (error) {
    console.error("Update project failed:", error);
  }
}

function* getCoProducersByProjectID({ payload: id }) {
  try {
    const response = yield call(
      Service.commonFetch,
      `/coproducers/project/${id}`,
      "GET",
      null
    );

    yield put(getProjectByCoProducersResponse(response));
    console.log(response);
  } catch (error) {
    console.error("Update project failed:", error);
  }
}

function* getInvestorsbyProjectId() {
  try {
    const response = yield call(Service.commonFetch, "/investors", "GET", null);

    yield put(getInvestorsByProjectIdResponse(response));
    console.log(response);
  } catch (error) {
    console.error("Update project failed:", error);
  }
}

function* getProjectByProducerId({ payload: id }) {
  try {
    const response = yield call(
      Service.commonFetch,
      `/projects/producer/${id}`,
      "GET",
      null
    );

    yield put(getProjectByProducerIdResponse(response));
    console.log(response);
  } catch (error) {
    console.error("Update project failed:", error);
  }
}

function* createPartysProject({ payload: createPartysProject }) {
  try {
    const response = yield call(
      Service.commonFetch,
      "/partysprojects",
      "POST",
      createPartysProject,
      null
    );
    yield put(createPartysProjectResponse(response));
    console.log(response);
  } catch (error) {}
}

function* getallPartysProject({ payload: id }) {
  try {
    const response = yield call(
      Service.commonFetch,
      `/partysprojects/project/${id}`,
      "GET",
      null
    );
    yield put(getAllPartysProjectResponse(response));
    console.log(response);
  } catch (error) {}
}

function* getPartysProjectByID({ payload: id }) {
  try {
    const response = yield call(
      Service.commonFetch,
      `/partysprojects/${id}`,
      "GET",
      null
    );

    yield put(getPartisProjectByIDResponse(response));
    console.log(response);
  } catch (error) {
    console.error("Update project failed:", error);
  }
}

function* deleteProject({ payload: id }) {
  try {
    const response = yield call(
      Service.commonFetch,
      `/projects/${id}`,
      "DELETE",
      null
    );

    yield put(deleteProjectResponse(response));
    console.log(response);
  } catch (error) {
    console.error("delete project failed:", error);
  }
}

function* projects() {
  yield takeEvery(PROJECTS, getallProjects);
  yield takeEvery(CREATE_PROJECTS, createProject);
  yield takeEvery(GET_PROJECTS_BY_ID, getProjectsById);
  yield takeEvery(UPDATE_PROJECTS, updateProject);
  yield takeEvery(GET_PROJECTS_BY_COPRODUCERSID, getCoProducersByProjectID);
  yield takeEvery(GET_INVESTORS_BY_PROJECT_ID, getInvestorsbyProjectId);
  yield takeEvery(GET_PROJECT_BY_PRODUCER_ID, getProjectByProducerId);
  yield takeEvery(CREATE_PARTYS_PROJECT, createPartysProject);
  yield takeEvery(GET_ALL_PARTYS_PROJECT, getallPartysProject);
  yield takeEvery(GET_PARTYS_PROJECT_BY_ID, getPartysProjectByID);
  yield takeEvery(DELETE_PROJECT, deleteProject);

}

export default projects;
