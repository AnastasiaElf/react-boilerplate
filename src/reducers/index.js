import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import localization from "./common/localization";

const appReducer = combineReducers({    
    localization
});

export const rootReducer = (state, action) => {
    return appReducer(state, action)
};

export const rootEpic = combineEpics();