import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import { Amplify } from 'aws-amplify';
import config from './config';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import productReducer from './redux/reducers/product';
import orderReducer from './redux/reducers/order';
import authReducer from './redux/reducers/auth';




import App from './App';
import * as serviceWorker from './serviceWorker';

const rootReducer = combineReducers({
  productList: productReducer,
  ordersInfo: orderReducer,
  authStatus: authReducer
})
const store = createStore(rootReducer);

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID
  },
  API: {
    endpoints: [
      {
        name: "books",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
      {
        name: "orders",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      }
    ]
  }
});
ReactDOM.render(
  <Provider store = {store}>
  <BrowserRouter>
     <App />
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
