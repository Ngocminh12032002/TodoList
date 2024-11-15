import { call, put, takeLatest } from 'redux-saga/effects';
import { getTasks } from '../../axios/api';
import {
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILURE,
} from '../../redux/taskAction';

function* fetchTasksSaga() {
  try {
    const tasks = yield call(getTasks);
    yield put({ type: FETCH_TASKS_SUCCESS, payload: tasks });
  } catch (error) {
    yield put({ type: FETCH_TASKS_FAILURE, payload: error.message })
  }
}

export function* watchTasksSaga() {
  yield takeLatest(FETCH_TASKS_REQUEST, fetchTasksSaga);
}
