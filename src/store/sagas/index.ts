import { all } from 'redux-saga/effects';
import authSage from './auth.sagas';

export default function* rootSaga()  {
  yield all([authSage()])
}