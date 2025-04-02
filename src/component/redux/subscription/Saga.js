// import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { SUBSCRIPTION,ADD_SUBSCRIPTION,EDIT_SUBSCRIPTION,GET_BY_ID_SUBSCRIPTION,DELETE_SUBSCRIPTION} from "./ActionTypes";
import { Service } from "../../service/Helper";
import { getAllSubscriptionResponse,addSubscriptionResponse,editSubscriptionResponse,getBySubscriptionIdResponse  ,deleteSubscriptionResponse } from "./Action";

function* getallSubscription() {
  try {
    const response = yield call(
      Service.commonFetch,
      "/subscriptions",
      "GET",
      null
    );
    yield put(getAllSubscriptionResponse(response));
    console.log(response)

  } catch (error) {

  }
}

function* addSubscription({payload : addSubscription}) {
    try {
      const response = yield call(
        Service.commonFetch,
        "/subscriptions",
        "POST",
        addSubscription,
        null
      );
      yield put(addSubscriptionResponse(response));
      console.log(response)
  
    } catch (error) {
  
    }
  }

  function* editSubscription({payload }) {
    try {

      const { id, data } = payload;
      const response = yield call(
        Service.commonFetch,
        `/subscriptions/${id}`,
        "PUT",
        data,
        null
      );
      yield put(editSubscriptionResponse(response));
      console.log(response)
  
    } catch (error) {
  
    }
  }

  function* getBySubscriptionId({payload : getBySubscriptionId}) {
    try {
      const response = yield call(
        Service.commonFetch,
        `/subscriptions/${getBySubscriptionId}`,
        "GET",
        null
      );
      yield put(getBySubscriptionIdResponse(response));
      console.log(response)
  
    } catch (error) {
  
    }
  }

  function* deleteSubscription({payload : deleteSubscription}) {
    try {
      const response = yield call(
        Service.commonFetch,
        `/subscriptions/${deleteSubscription}`,
        "DELETE",
        null
      );
      yield put(deleteSubscriptionResponse(response));
      console.log(response)
  
    } catch (error) {
  
    }
  }

function* subscription() {
  yield takeEvery(SUBSCRIPTION, getallSubscription);
  yield takeEvery(ADD_SUBSCRIPTION, addSubscription);
  yield takeEvery(EDIT_SUBSCRIPTION, editSubscription);
  yield takeEvery(GET_BY_ID_SUBSCRIPTION, getBySubscriptionId);
  yield takeEvery(DELETE_SUBSCRIPTION, deleteSubscription);

}

export default subscription;
