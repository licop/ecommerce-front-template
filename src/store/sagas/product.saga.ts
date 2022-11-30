import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';
import { API } from '../../config';
import { GetProductAction, getProductSuccess, GET_PRODUCT } from '../actions/product.action';
import { Product } from '../models/product';

function* handleGetProduct({sortBy, limit, order}: GetProductAction): any {
  let response = yield axios.get<Product[]>(`${API}/products`, {
    params: { sortBy, order, limit }
  })
  yield put(getProductSuccess(response.data, sortBy))
}

export default function* productSaga() {
  yield takeEvery(GET_PRODUCT, handleGetProduct)
}