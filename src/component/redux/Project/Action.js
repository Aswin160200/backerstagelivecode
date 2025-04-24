import {CREATE_PROJECTS, CREATE_PROJECTS_RESPONSE, PROJECTS_RESPONSE,GET_PROJECTS_BY_ID_RESPONSE, UPDATE_PROJECTS_RESPONSE, UPDATE_PROJECTS, GET_PROJECTS_BY_COPRODUCERSID_RESPONSE, GET_PROJECTS_BY_COPRODUCERSID, GET_INVESTORS_BY_PROJECT_ID_RESPONSE, GET_INVESTORS_BY_PROJECT_ID, GET_PROJECT_BY_PRODUCER_ID_RESPONSE, GET_PROJECT_BY_PRODUCER_ID, CREATE_PARTYS_PROJECT, CREATE_PARTYS_PROJECT_RESPONSE, GET_ALL_PARTYS_PROJECT, GET_ALL_PARTYS_PROJECT_RESPONSE, GET_PARTYS_PROJECT_BY_ID, GET_PARTYS_PROJECT_BY_ID_RESPONSE, DELETE_PROJECT, DELETE_PROJECT_RESPONSE} from "./ActionTypes";
import {PROJECTS,GET_PROJECTS_BY_ID} from "./ActionTypes";

export const getAllProjects = (allprojects) => ({
    type: PROJECTS,
    payload: allprojects,
});

export const getAllProjectsResponse = (allProjectsResponse) => ({
    type: PROJECTS_RESPONSE,
    payload: allProjectsResponse,
});

export const createProjects = (createProjects) => ({
    type: CREATE_PROJECTS,
    payload: createProjects,
});

export const createProjectsResponse = (ceateProjectsResponse) => ({
    type: CREATE_PROJECTS_RESPONSE,
    payload: ceateProjectsResponse,
});

export const getProjectsByID = (projectsByID) => ({
    type: GET_PROJECTS_BY_ID,
    payload: projectsByID,
});

export const getProjectsByIDResponse = (getProjectsByIDResponse) => ({
    type: GET_PROJECTS_BY_ID_RESPONSE,
    payload: getProjectsByIDResponse,
});

export const updateProjects = (updateProjects) => ({
    type: UPDATE_PROJECTS,
    payload: updateProjects,
});

export const updateProjectsResponse = (updateProjectsResponse) => ({
    type: UPDATE_PROJECTS_RESPONSE,
    payload: updateProjectsResponse,
});

export const getProjectByCoProducers = (ProjectByCoProducers) => ({
    type: GET_PROJECTS_BY_COPRODUCERSID,
    payload: ProjectByCoProducers,
});

export const getProjectByCoProducersResponse = (ProjectByCoProducersResponse) => ({
    type: GET_PROJECTS_BY_COPRODUCERSID_RESPONSE,
    payload: ProjectByCoProducersResponse,
});

export const getInvestorsByProjectId = (investorsByProjectId) => ({
    type: GET_INVESTORS_BY_PROJECT_ID,
    payload: investorsByProjectId,
});

export const getInvestorsByProjectIdResponse = (investorsByProjectIdResponse) => ({
    type: GET_INVESTORS_BY_PROJECT_ID_RESPONSE,
    payload: investorsByProjectIdResponse,
});

export const getProjectByProducerId = (projectByProducerId) => ({
    type: GET_PROJECT_BY_PRODUCER_ID,
    payload: projectByProducerId,
});

export const getProjectByProducerIdResponse = (projectByProducerIdResponse) => ({
    type: GET_PROJECT_BY_PRODUCER_ID_RESPONSE,
    payload: projectByProducerIdResponse,
});

export const createPartysProject = (createPartysProject) => ({
    type: CREATE_PARTYS_PROJECT,
    payload: createPartysProject,
});

export const createPartysProjectResponse = (createPartysProjectResponse) => ({
    type: CREATE_PARTYS_PROJECT_RESPONSE,
    payload: createPartysProjectResponse,
});

export const getAllPartysProject = (allPartysProject) => ({
    type: GET_ALL_PARTYS_PROJECT,
    payload: allPartysProject,
});

export const getAllPartysProjectResponse = (allPartysProjectResponse) => ({
    type: GET_ALL_PARTYS_PROJECT_RESPONSE,
    payload: allPartysProjectResponse,
});

export const getPartisProjectByID = (partisProjectByID) => ({
    type: GET_PARTYS_PROJECT_BY_ID,
    payload: partisProjectByID,
});

export const getPartisProjectByIDResponse = (partisProjectByIDResponse) => ({
    type: GET_PARTYS_PROJECT_BY_ID_RESPONSE,
    payload: partisProjectByIDResponse,
});

export const deleteProject = (deleteProject) => ({
    type: DELETE_PROJECT,
    payload: deleteProject,
});

export const deleteProjectResponse = (deleteProjectResponse) => ({
    type: DELETE_PROJECT_RESPONSE,
    payload: deleteProjectResponse,
});