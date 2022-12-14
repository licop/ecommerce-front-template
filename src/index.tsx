import React from 'react';
import ReactDOM from 'react-dom/client';
import MyRoutes from './MyRoutes'
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store, { history } from './store'
import { ConnectedRouter } from 'connected-react-router';
import CountContext from "./CountContext"

import 'antd/dist/antd.min.css';
import './style.css';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <CountContext>
        <MyRoutes />
      </CountContext>
    </ConnectedRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
