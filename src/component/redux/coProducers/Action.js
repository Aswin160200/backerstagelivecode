import { CO_PRODUCERS,ADD_CO_PRODUCERS,EDIT_CO_PRODUCERS,GET_BY_ID,DELETE_CO_PRODUCERS, GET_PROJJECT_BY_COPRODUCERS_ID, GET_PROJJECT_BY_COPRODUCERS_ID_RESPONSE, GET_BY_COPRODUCER_ID, GET_BY_COPRODUCER_ID_RESPONSE, GET_COPRODUCER_BY_PRODUCER_ID, GET_COPRODUCER_BY_PRODUCER_ID_RESPONSE} from "./ActionTypes";
import {CO_PRODUCERS_RESPONSE,ADD_CO_PRODUCERS_RESPONSE,EDIT_CO_PRODUCERS_RESPONSE,GET_BY_ID_RESPONSE,DELETE_CO_PRODUCERS_RESPONSE} from "./ActionTypes";

export const getAllCoProducers = (allCoProducers) => ({
    type: CO_PRODUCERS,
    payload: allCoProducers,
});

export const getAllCoProducersResponse = (allCoProducersResponse) => ({
    type: CO_PRODUCERS_RESPONSE,
    payload: allCoProducersResponse,
});

export const createNewCoProducers = (addCoProducers) => ({
    type: ADD_CO_PRODUCERS,
    payload: addCoProducers,
});

export const addCoProducersResponse = (addCoProducersResponse) => ({
    type: ADD_CO_PRODUCERS_RESPONSE,
    payload: addCoProducersResponse,
});

export const editCoProducers = (editCoProducers) => ({
    type: EDIT_CO_PRODUCERS,
    payload: editCoProducers,
});

export const editCoProducersResponse = (editCoProducersResponse) => ({
    type: EDIT_CO_PRODUCERS_RESPONSE,
    payload: editCoProducersResponse,
});

export const getByCoProducersId = (getByCoProducersId) => ({
    type: GET_BY_COPRODUCER_ID,
    payload: getByCoProducersId,
});

export const getByCoProducersIdResponse = (getByIdResponse) => ({
    type: GET_BY_COPRODUCER_ID_RESPONSE,
    payload: getByIdResponse,
});

export const deleteCoProducers = (deleteCoProducers) => ({
    type: DELETE_CO_PRODUCERS,
    payload: deleteCoProducers,
});

export const deleteCoProducersResponse = (deleteCoProducersResponse) => ({
    type: DELETE_CO_PRODUCERS_RESPONSE,
    payload: deleteCoProducersResponse,
});

export const getProjectByCoProducerID = (projectByCoProducerID) => ({
    type: GET_PROJJECT_BY_COPRODUCERS_ID,
    payload: projectByCoProducerID,
});

export const getProjectByCoProducerIDResponse = (projectByCoProducerIDResponse) => ({
    type: GET_PROJJECT_BY_COPRODUCERS_ID_RESPONSE,
    payload: projectByCoProducerIDResponse,
});


export const getCoProducerByProducerId = (coProducerByProducerId) => ({
    type: GET_COPRODUCER_BY_PRODUCER_ID,
    payload: coProducerByProducerId,
});

export const getCoProducerByProducerIdResponse = (coProducerByProducerIdResponse) => ({
    type: GET_COPRODUCER_BY_PRODUCER_ID_RESPONSE,
    payload: coProducerByProducerIdResponse,
});