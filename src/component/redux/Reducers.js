import { combineReducers } from "redux";
import projects from "./Project/Reducers";
import users from "./users/Reducers";
import investors  from "./viewInvestors/Reducers";
import coProducers from "./coProducers/Reducers";
import login from "./Login/Reducers";
import subscription from "./subscription/Reducers";
import distributions from "./distributions/Reducers";
import projectCost from "./projectCost/Reducers";

const reducers = combineReducers({
    projects,
    users,
    investors,
    coProducers,
    login,
    subscription,
    distributions,
    projectCost,

});
export default reducers;
