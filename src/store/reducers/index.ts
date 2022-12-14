import { connectRouter, RouterState } from 'connected-react-router';
import { combineReducers } from 'redux';
import { History } from 'history';
import authReducer, { AuthState } from './auth.reducer';
import catetoryReducer, { CategoryState } from './category.reducer';
import productReducer, { ProductState } from './product.reducer';

export interface AppState {
  router: RouterState,
  auth: AuthState,
  category: CategoryState,
  product: ProductState
}

const createRootReducer = (history: History) => combineReducers({
  // 将路由状态同步到全局store
  router: connectRouter(history),
  auth: authReducer,
  category: catetoryReducer,
  product: productReducer
})

export default createRootReducer

