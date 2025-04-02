// import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { CO_PRODUCERS,ADD_CO_PRODUCERS,EDIT_CO_PRODUCERS,GET_BY_COPRODUCER_ID,DELETE_CO_PRODUCERS,GET_PROJJECT_BY_COPRODUCERS_ID,GET_COPRODUCER_BY_PRODUCER_ID} from "./ActionTypes";
import { Service } from "../../service/Helper";
import { getAllCoProducersResponse,addCoProducersResponse,editCoProducersResponse,getByCoProducersIdResponse,deleteCoProducersResponse,getProjectByCoProducerIDResponse, getCoProducerByProducerIdResponse } from "./Action";

function* getallCoProducers() {
  try {
    const response = yield call(
      Service.commonFetch,
      "/coproducers",
      "GET",
      null
    );
    yield put(getAllCoProducersResponse(response));
    console.log(response)

  } catch (error) {

  }
}

function* addCoProducers({payload : addCoProducers}) {
    try {
      const response = yield call(
        Service.commonFetch,
        "/coproducers",
        "POST",
        addCoProducers,
        null
      );
      yield put(addCoProducersResponse(response));
      console.log(response)
  
    } catch (error) {
  
    }
  }

  function* editCoProducers({payload }) {
    try {
      const { id, data } = payload;

      const response = yield call(
        Service.commonFetch,
        `/coproducers/${id}`,
        "PUT",
        data,
        null
      );
      yield put(editCoProducersResponse(response));
      console.log(response)
  
    } catch (error) {
  
    }
  }

  function* getByCoProducersId({payload : getByCoProducersId}) {
    try {
      const response = yield call(
        Service.commonFetch,
        `/coproducers/${getByCoProducersId}`,
        "GET",
        null
      );
      yield put(getByCoProducersIdResponse(response));
      console.log(response)
  
    } catch (error) {
  
    }
  }

  function* deleteCoProducers({payload : deleteCoProducers}) {
    try {
      const response = yield call(
        Service.commonFetch,
        `/coproducers/${deleteCoProducers}`,
        "DELETE",
        null
      );
      yield put(deleteCoProducersResponse(response));
      console.log(response)
  
    } catch (error) {
  
    }
  }

  function* getProjectByCoProducersId() {
    try {
      const response = yield call(
        Service.commonFetch,
        "/projects",
        "GET",
        null
      );
      yield put(getProjectByCoProducerIDResponse(response));
      console.log(response)
  
    } catch (error) {
  
    }
  }

  function* getbyProducersId({payload : producerId}) {
    try {
      const response = yield call(
        Service.commonFetch,
        `/coproducers/producer/${producerId}`,
        "GET",
        null
      );
      yield put(getCoProducerByProducerIdResponse(response));
      console.log(response)
  
    } catch (error) {
  
    }
  }

function* coProducers() {
  yield takeEvery(CO_PRODUCERS, getallCoProducers);
  yield takeEvery(ADD_CO_PRODUCERS, addCoProducers);
  yield takeEvery(EDIT_CO_PRODUCERS, editCoProducers);
  yield takeEvery(GET_BY_COPRODUCER_ID, getByCoProducersId);
  yield takeEvery(DELETE_CO_PRODUCERS, deleteCoProducers);
  yield takeEvery(GET_PROJJECT_BY_COPRODUCERS_ID, getProjectByCoProducersId);
  yield takeEvery(GET_COPRODUCER_BY_PRODUCER_ID, getbyProducersId);

}

export default coProducers;
