/* eslint-disable no-useless-concat */
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';

import 'antd/dist/antd.css'
import './assets/scss/index.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import * as serviceWorker from './serviceWorker';
import jwt_decode from "jwt-decode";

import * as Msal from 'msal';


import authentication from 'react-azure-b2c';

// Redux
import { Provider } from "react-redux";
import store from "./redux/store/store"

import axios from 'axios';
// authentication.initialize();
// import './App.scss';

// import Authentication from '@react-azure-b2c';

import * as msal from 'msal'
import { loadAdmins, loadUserRole } from './redux/actions/user';
import PageLoader from './components/Common/PageLoader';


authentication.initialize({
  instance: 'https://msftinstoreexperience.b2clogin.com/',
  tenant: 'msftinstoreexperience.onmicrosoft.com',
  signInPolicy: 'B2C_1_signup_signin',
  clientId: '40dc7e8d-9e77-462d-bb4f-44d32ed0a73e',
  cacheLocation: 'sessionStorage',
  scopes: ['https://msftinstoreexperience.onmicrosoft.com/tasks-api/tasks.read'],
  redirectUri: 'https://msftccmfixture.azurewebsites.net/',
  // redirectUri: 'https://msftapp.azurewebsites.net/',
  // redirectUri: 'http://localhost:3000/',
  postLogoutRedirectUri: window.location.origin,
  storeAuthStateInCookie: true

});

authentication.run(() => {

  const token = authentication.getAccessToken()

  var decoded = jwt_decode(token);

  console.log("decoded", decoded)

  const userDetails = {
    name: decoded.name,
    country: decoded.country,
    email: decoded.emails[0],
    role: "Guest",
    requestedRole: decoded.extension_Role,
    
  }


  sessionStorage.setItem("userDetails", JSON.stringify(userDetails))

  if (sessionStorage.getItem("userDetails")) {
    store.dispatch(loadUserRole(userDetails))
    store.dispatch(loadAdmins())

  }






  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
  serviceWorker.unregister();
});


// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
