import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';
import { API } from '../../config';
import { GetProductAction, getProductSuccess, GET_PRODUCT, SearchProductAction, SearchProductSuccess, SEARCH_PRODUCT } from '../actions/product.action';
import { Product } from '../models/product';

function* handleGetProduct({sortBy, limit, order}: GetProductAction): any {
  let response = yield axios.get<Product[]>(`${API}/products`, {
    params: { sortBy, order, limit }
  })
  yield put(getProductSuccess(response.data, sortBy))
}

function* handleSearchProduct({
  payload: { search, category }
}: SearchProductAction): any {
  let response = yield axios.get(`${API}/products/search`, {
    params: { search, category }
  })
  yield put(SearchProductSuccess(response.data))
}

export default function* productSaga() {
  yield takeEvery(GET_PRODUCT, handleGetProduct)
  yield takeEvery(SEARCH_PRODUCT, handleSearchProduct)
}