import {
    EDIT_DISRIBUTION_BY_ID,
    EDIT_DISRIBUTION_BY_ID_RESPONSE,
  GET_ALL_DISTRIBUTIONS,
  GET_ALL_DISTRIBUTIONS_RESPONSE,
  GET_DISRIBUTION_BY_ID,
  GET_DISRIBUTION_BY_ID_RESPONSE,
  GET_DISTRIBUTION_BY_PRODUCER_ID,
  GET_DISTRIBUTION_BY_PRODUCER_ID_RESPONSE,
} from "./ActionTypes";

export const getAllDistributions = (allDistributions) => ({
  type: GET_ALL_DISTRIBUTIONS,
  payload: allDistributions,
});

export const getAllDistributionsResponse = (allDistributionsResponse) => ({
  type: GET_ALL_DISTRIBUTIONS_RESPONSE,
  payload: allDistributionsResponse,
});

export const getByProducersId = (producersId) => ({
  type: GET_DISTRIBUTION_BY_PRODUCER_ID,
  payload: producersId,
});

export const getByProducersIdResponse = (producersIdResponse) => ({
  type: GET_DISTRIBUTION_BY_PRODUCER_ID_RESPONSE,
  payload: producersIdResponse,
});

export const getByDistributionId = (distributionId) => ({
  type: GET_DISRIBUTION_BY_ID,
  payload: distributionId,
});

export const getByDistributionIdResponse = (distributionIdResponse) => ({
  type: GET_DISRIBUTION_BY_ID_RESPONSE,
  payload: distributionIdResponse,
});


export const editByDistributionId = (distributionId) => ({
    type: EDIT_DISRIBUTION_BY_ID,
    payload: distributionId,
  });
  
  export const editByDistributionIdResponse = (distributionIdResponse) => ({
    type: EDIT_DISRIBUTION_BY_ID_RESPONSE,
    payload: distributionIdResponse,
  });