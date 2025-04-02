import { LOGIN} from "./ActionTypes";
import {LOGIN_RESPONSE} from "./ActionTypes";

export const getLogin = (login) => ({
    type: LOGIN,
    payload: login,
});

export const getLoginResponse = (loginResponse) => ({
    type: LOGIN_RESPONSE,
    payload: loginResponse,
});
