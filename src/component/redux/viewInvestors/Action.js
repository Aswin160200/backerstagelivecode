import { DELETE_INVESTORS, DELETE_INVESTORS_RESPONSE, EDIT_INVESTORS, EDIT_INVESTORS_RESPONSE, GET_INVESTOR_BY_ID, GET_INVESTOR_BY_ID_RESPONSE, GET_INVESTORS_BY_PRODUCER_ID, GET_INVESTORS_BY_PRODUCER_ID_RESPONSE, GET_PROJECT_BY_INVESTORS_ID, GET_PROJECT_BY_INVESTORS_ID_RESPONSE, INVESTORS} from "./ActionTypes";
import {INVESTORS_RESPONSE,ADD_INVESTOR,ADD_INVESTOR_RESPONSE} from "./ActionTypes";

export const getAllInvestors = (allinvestors) => ({
    type: INVESTORS,
    payload: allinvestors,
});

export const getAllInvestorsResponse = (allinvestorsResponse) => ({
    type: INVESTORS_RESPONSE,
    payload: allinvestorsResponse,
});
    
export const editInvestors = (editInvestors) => ({
    type: EDIT_INVESTORS,
    payload: editInvestors,
});

export const editInvestorsResponse = (editInvestorsResponse) => ({
    type: EDIT_INVESTORS_RESPONSE,
    payload: editInvestorsResponse,
});

export const addInvestors = (addInvestors) => ({
    type: ADD_INVESTOR,
    payload: addInvestors,
});

export const addInvestorsResponse = (addInvestorsResponse) => ({
    type: ADD_INVESTOR_RESPONSE,
    payload: addInvestorsResponse,
});

export const getInvestorById = (investorId) => ({
    type: GET_INVESTOR_BY_ID,
    payload: investorId,
});

export const getInvestorByIdResponse = (getInvestorByIdResponse) => ({
    type: GET_INVESTOR_BY_ID_RESPONSE,
    payload: getInvestorByIdResponse,
});

export const getProjectByInvestorsId = (projectByInvestorsId) => ({
    type: GET_PROJECT_BY_INVESTORS_ID,
    payload: projectByInvestorsId,
});

export const getProjectByInvestorsIdResponse = (projectByInvestorsIdResponse) => ({
    type: GET_PROJECT_BY_INVESTORS_ID_RESPONSE,
    payload: projectByInvestorsIdResponse,
});

export const getInvestorbyProducerId = (getInvestorbyProducerId) => ({
    type: GET_INVESTORS_BY_PRODUCER_ID,
    payload: getInvestorbyProducerId,
});

export const getInvestorsByProducersIdResponse = (getInvestorsByProducersIdResponse) => ({
    type: GET_INVESTORS_BY_PRODUCER_ID_RESPONSE,
    payload: getInvestorsByProducersIdResponse,
});

export const deleteInvestors = (deleteInvestors) => ({
    type: DELETE_INVESTORS,
    payload: deleteInvestors,
});

export const deleteInvestorsResponse = (deleteInvestorsResponse) => ({
    type: DELETE_INVESTORS_RESPONSE,
    payload: deleteInvestorsResponse,
});