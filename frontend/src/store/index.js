import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import memoriesReducer from "./memories";
import tagsReducer from './tags';
import mainContentReducer from './mainContent';

const rootReducer = combineReducers({
    session: sessionReducer,
    memories: memoriesReducer,
    tags: tagsReducer,
    mainContent: mainContentReducer
});

let enhancer;



if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}


const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};
  
export default configureStore;