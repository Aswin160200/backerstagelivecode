import { combineReducers } from "redux";
import projects from "./Project/Reducers";
import users from "./users/Reducers";
import investors  from "./viewInvestors/Reducers";
import coProducers from "./coProducers/Reducers";
import login from "./Login/Reducers";
import subscription from "./subscription/Reducers";
import distributions from "./distributions/Reducers";
import projectCost from "./projectCost/Reducers";
import notes from "./notes/Reducers";
import documents from "./documents/Reducers";

const reducers = combineReducers({
    projects,
    users,
    investors,
    coProducers,
    login,
    subscription,
    distributions,
    projectCost,
    notes,
    documents,

});
export default reducers;
