import { applyMiddleware, createStore } from 'redux';
import { createHashHistory } from 'history';
import createRootReducer from './reducers';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension'
import rootSaga from './sagas';

export const history = createHashHistory()
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  createRootReducer(history), 
  // 将路由状态同步到全局store
  composeWithDevTools(applyMiddleware(routerMiddleware(history), sagaMiddleware))
)

sagaMiddleware.run(rootSaga)

export default store
