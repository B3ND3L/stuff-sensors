import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk';

import './css/index.css';

import { Router, browserHistory } from 'react-router'
import getRoutes from './routes';



import reducers from './reducers'

const initialState = {
  message : {
    text:"",
    level: 'INFO'
  },
  broker: {
    url: 'ws://172.18.0.1:8080',
    status: 'BROKER_DISCONNECTED',
  },
  sensors: [
  ]
}


const store = createStore(
  reducers,
  initialState,
  applyMiddleware(
    thunkMiddleware
  )
);



ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={getRoutes(store)} />
  </Provider>,
  document.getElementById('root')
);
