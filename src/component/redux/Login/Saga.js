// import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { LOGIN,} from "./ActionTypes";
import { Service } from "../../service/Helper";
import { getLoginResponse,} from "./Action";

function* loginUser({payload : login}) {
  try {
    const response = yield call(
      Service.commonFetch,
      "/login",
      "POST",
      login,
      null
    );
    yield put(getLoginResponse(response));
    console.log(response)

  } catch (error) {

  }
}


function* login() {
  yield takeEvery(LOGIN, loginUser);

}

export default login;
