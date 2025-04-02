import { USERS,ADD_USERS,EDIT_USERS,GET_BY_ID,DELETE_USER} from "./ActionTypes";
import {USERS_RESPONSE,ADD_USERS_RESPONSE,EDIT_USERS_RESPONSE,GET_BY_ID_RESPONSE,DELETE_USER_RESPONSE} from "./ActionTypes";

export const getAllUsers = (allUsers) => ({
    type: USERS,
    payload: allUsers,
});

export const getAllUsersResponse = (allUsersResponse) => ({
    type: USERS_RESPONSE,
    payload: allUsersResponse,
});

export const addUsers = (addUsers) => ({
    type: ADD_USERS,
    payload: addUsers,
});

export const addUsersResponse = (addUsersResponse) => ({
    type: ADD_USERS_RESPONSE,
    payload: addUsersResponse,
});

export const editExitUsers = (editUsers) => ({
    type: EDIT_USERS,
    payload: editUsers,
});

export const editUsersResponse = (editUsersResponse) => ({
    type: EDIT_USERS_RESPONSE,
    payload: editUsersResponse,
});

export const getByUserId = (getById) => ({
    type: GET_BY_ID,
    payload: getById,
});

export const getByIdResponse = (getByIdResponse) => ({
    type: GET_BY_ID_RESPONSE,
    payload: getByIdResponse,
});

export const deleteUser = (deleteUser) => ({
    type: DELETE_USER,
    payload: deleteUser,
});

export const deleteUserResponse = (deleteUserResponse) => ({
    type: DELETE_USER_RESPONSE,
    payload: deleteUserResponse,
});