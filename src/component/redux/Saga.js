import { all } from "redux-saga/effects";
import projects from "./Project/Saga";
import users from "./users/Saga";
import investors from "./viewInvestors/Saga";
import coProducers from "./coProducers/Saga";
import login from "./Login/Saga";
import subscription from "./subscription/Saga";
import distributions from "./distributions/Saga";
import projectCost from "./projectCost/Saga";

export default function* rootSaga() {
    yield all([
        projects(),
        users(),
        investors(),
        coProducers(),
        login(),
        subscription(),
        distributions(),
        projectCost(),
    ])
}
