import { all } from 'redux-saga/effects';
import { watchTasksSaga } from './fetchSagas';

export default function* rootSaga() {
  yield all([
    watchTasksSaga(),
  ]);
}
