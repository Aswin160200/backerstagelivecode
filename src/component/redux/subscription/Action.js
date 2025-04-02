import { SUBSCRIPTION,ADD_SUBSCRIPTION,EDIT_SUBSCRIPTION,GET_BY_ID,DELETE_SUBSCRIPTION, GET_BY_ID_SUBSCRIPTION, GET_BY_ID_SUBSCRIPTION_RESPONSE} from "./ActionTypes";
import {SUBSCRIPTION_RESPONSE,ADD_SUBSCRIPTION_RESPONSE,EDIT_SUBSCRIPTION_RESPONSE,GET_BY_ID_RESPONSE,DELETE_SUBSCRIPTION_RESPONSE} from "./ActionTypes";

export const getAllSubscription = (allSubscription) => ({
    type: SUBSCRIPTION,
    payload: allSubscription,
});

export const getAllSubscriptionResponse = (allaSubscriptionResponse) => ({
    type: SUBSCRIPTION_RESPONSE,
    payload: allaSubscriptionResponse,
});

export const addSubscription = (addSubscription) => ({
    type: ADD_SUBSCRIPTION,
    payload: addSubscription,
});

export const addSubscriptionResponse = (addSubscriptionResponse) => ({
    type: ADD_SUBSCRIPTION_RESPONSE,
    payload: addSubscriptionResponse,
});

export const editSubscriptiondata = (editSubscription) => ({
    type: EDIT_SUBSCRIPTION,
    payload: editSubscription,
});

export const editSubscriptionResponse = (editSubscriptionResponse) => ({
    type: EDIT_SUBSCRIPTION_RESPONSE,
    payload: editSubscriptionResponse,
});

export const getBySubscriptionId = (getBySubscriptionId) => ({
    type: GET_BY_ID_SUBSCRIPTION,
    payload: getBySubscriptionId,
});

export const getBySubscriptionIdResponse = (getByIdResponse) => ({
    type: GET_BY_ID_SUBSCRIPTION_RESPONSE,
    payload: getByIdResponse,
});

export const deleteSubscriptiondata = (deleteSubscription) => ({
    type: DELETE_SUBSCRIPTION,
    payload: deleteSubscription,
});

export const deleteSubscriptionResponse = (deleteSubscriptionResponse) => ({
    type: DELETE_SUBSCRIPTION_RESPONSE,
    payload: deleteSubscriptionResponse,
});