// src/store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk'; // Import 'thunk' as a named export
import tasksReducer from './redux/taskReducer';
import rootSaga from './redux/sagas/rootSaga';
import createSagaMiddleware from 'redux-saga';

const rootReducer = combineReducers({
  tasks: tasksReducer,
});

// const store = createStore(rootReducer, applyMiddleware(thunk));
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
