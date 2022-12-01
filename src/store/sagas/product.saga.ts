import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';
import { API } from '../../config';
import { FilterProductAction, filterProductSuccess, FILTER_PRODUCT, GetProductAction, GetProductByIdAction, getProductByIdSuccess, getProductSuccess, GET_PRODUCT, GET_PRODUCT_BY_ID, SearchProductAction, SearchProductSuccess, SEARCH_PRODUCT } from '../actions/product.action';
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
function* handleFilterProduct(action: FilterProductAction): any {
  let response = yield axios.post(`${API}/products/filter`, action.payload)
  yield put(filterProductSuccess(response.data, action.payload.skip))
}

function* handleGetProductById(action: GetProductByIdAction): any {
  let response = yield axios.get(`${API}/product/${action.payload.productId}`)
  yield put(getProductByIdSuccess(response.data))
}

export default function* productSaga() {
  yield takeEvery(GET_PRODUCT, handleGetProduct)
  yield takeEvery(SEARCH_PRODUCT, handleSearchProduct)
  yield takeEvery(FILTER_PRODUCT, handleFilterProduct)
  yield takeEvery(GET_PRODUCT_BY_ID, handleGetProductById)
}