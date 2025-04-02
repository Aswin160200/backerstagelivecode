import {
    EDIT_DISRIBUTION_BY_ID,
    EDIT_DISRIBUTION_BY_ID_RESPONSE,

} from "./ActionTypes";

export const getAllDistributions = (allDistributions) => ({
  type: GET_ALL_DISTRIBUTIONS,
  payload: allDistributions,
});

export const getAllDistributionsResponse = (allDistributionsResponse) => ({
  type: GET_ALL_DISTRIBUTIONS_RESPONSE,
  payload: allDistributionsResponse,
});
