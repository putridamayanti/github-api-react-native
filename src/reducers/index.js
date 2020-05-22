import { combineReducers } from 'redux';
import AuthReducer from "./AuthReducer";
import RepositoryReducer from "./RepositoryReducer";

const reducers = {
    authStore: AuthReducer,
    repoStore: RepositoryReducer
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
