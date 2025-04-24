import {
  ADD_NEW_PROJECT_COST,
  ADD_NEW_PROJECT_COST_RESPONSE,
    DELETE_PROJECT_COST,
    DELETE_PROJECT_COST_RESPONSE,
    EDIT_PROJECTCOST_BY_ID,
    EDIT_PROJECTCOST_BY_ID_RESPONSE,
  GET_ALL_PROJECTCOST,
  GET_ALL_PROJECTCOST_RESPONSE,
  GET_PROJECTCOST_BY_ID,
  GET_PROJECTCOST_BY_ID_RESPONSE,
  GET_PROJECTCOST_BY_PRODUCER_ID,
  GET_PROJECTCOST_BY_PRODUCER_ID_RESPONSE,
} from "./ActionTypes";

export const getAllProjectCost = (allProjectCost) => ({
  type: GET_ALL_PROJECTCOST,
  payload: allProjectCost,
});

export const getAllProjectCostResponse = (allProjectCostResponse) => ({
  type: GET_ALL_PROJECTCOST_RESPONSE,
  payload: allProjectCostResponse,
});

export const getProjectCostByProducersId = (producersId) => ({
  type: GET_PROJECTCOST_BY_PRODUCER_ID,
  payload: producersId,
});

export const getProjectCostByProducersIdResponse = (producersIdResponse) => ({
  type: GET_PROJECTCOST_BY_PRODUCER_ID_RESPONSE,
  payload: producersIdResponse,
});

export const getByProjectCostId = (projectCostId) => ({
  type: GET_PROJECTCOST_BY_ID,
  payload: projectCostId,
});

export const getByProjectCostIdResponse = (projectCostIdResponse) => ({
  type: GET_PROJECTCOST_BY_ID_RESPONSE,
  payload: projectCostIdResponse,
});


export const editByProjectCostId = (projectCostId) => ({
    type: EDIT_PROJECTCOST_BY_ID,
    payload: projectCostId,
  });
  
  export const editByProjectCostIdResponse = (projectCostIdResponse) => ({
    type: EDIT_PROJECTCOST_BY_ID_RESPONSE,
    payload: projectCostIdResponse,
  });


  export const addNewProjectCost = (addNewProjectCost) => ({
    type: ADD_NEW_PROJECT_COST,
    payload: addNewProjectCost,
  });
  
  export const addNewProjectCostResponse = (addNewProjectCostResponse) => ({
    type: ADD_NEW_PROJECT_COST_RESPONSE,
    payload: addNewProjectCostResponse,
  });

  export const deleteProjectcost = (deleteProjectcost) => ({
    type: DELETE_PROJECT_COST,
    payload: deleteProjectcost,
  });
  
  export const deleteProjectcostResponse = (deleteProjectcostResponse) => ({
    type: DELETE_PROJECT_COST_RESPONSE,
    payload: deleteProjectcostResponse,
  });