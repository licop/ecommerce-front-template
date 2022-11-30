import { all } from 'redux-saga/effects';
import authSage from './auth.saga';
import categorySaga from './category.saga';

export default function* rootSaga()  {
  yield all([authSage(), categorySaga()])
}