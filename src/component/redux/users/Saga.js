// import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { USERS,ADD_USERS,EDIT_USERS,GET_BY_ID,DELETE_USER} from "./ActionTypes";
import { Service } from "../../service/Helper";
import { getAllUsersResponse,addUsersResponse,editUsersResponse,getByIdResponse,deleteUserResponse } from "./Action";

function* getallUsers() {
  try {
    const response = yield call(
      Service.commonFetch,
      "/users",
      "GET",
      null
    );
    yield put(getAllUsersResponse(response));
    console.log(response)

  } catch (error) {

  }
}

function* addUsers({payload : addUsers}) {
    try {
      const response = yield call(
        Service.commonFetch,
        "/users",
        "POST",
        addUsers,
        null
      );
      yield put(addUsersResponse(response));
      console.log(response)
  
    } catch (error) {
  
    }
  }

  function* editUsers({ payload: { updateId, updateProducerUser } }) {
    try {
      const response = yield call(
        Service.commonFetch,
        `/users/user?userid=${updateId}`, 
        "PUT",
        updateProducerUser

      );
  
      yield put(editUsersResponse(response)); 
      console.log(response);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }
  

  function* getById({payload : getById}) {
    try {
      const response = yield call(
        Service.commonFetch,
        `/users/user?userid=${getById}`,
        "GET",
        null
      );
      yield put(getByIdResponse(response));
      console.log(response)
  
    } catch (error) {
  
    }
  }

  function* deleteUser({payload : deleteUser}) {
    try {
      const response = yield call(
        Service.commonFetch,
        `/users/user?userid=${deleteUser}`,
        "DELETE",
        null
      );
      yield put(deleteUserResponse(response));
      console.log(response)
  
    } catch (error) {
  
    }
  }

function* users() {
  yield takeEvery(USERS, getallUsers);
  yield takeEvery(ADD_USERS, addUsers);
  yield takeEvery(EDIT_USERS, editUsers);
  yield takeEvery(GET_BY_ID, getById);
  yield takeEvery(DELETE_USER, deleteUser);

}

export default users;
