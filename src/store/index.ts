import { applyMiddleware, createStore } from 'redux';
import { createHashHistory } from 'history';
import createRootReducer from './reducers';
import { routerMiddleware } from 'connected-react-router';

export const history = createHashHistory()

const store = createStore(
  createRootReducer(history), 
  // 将路由状态同步到全局store
  applyMiddleware(routerMiddleware(history))
)

export default store
