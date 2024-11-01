// src/store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk'; // Import 'thunk' as a named export
import tasksReducer from './redux/taskReducer';

const rootReducer = combineReducers({
  tasks: tasksReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
