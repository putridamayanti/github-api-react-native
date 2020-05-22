import { combineReducers } from 'redux';
import AuthReducer from "./AuthReducer";
import RepositoryReducer from "./RepositoryReducer";
import CommitReducer from "./CommitReducer";

const reducers = {
    authStore   : AuthReducer,
    repoStore   : RepositoryReducer,
    commitStore : CommitReducer
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
