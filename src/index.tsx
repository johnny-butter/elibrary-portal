import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';

import {
  BooksList,
  CollectedBooksList,
  UserProfile,
  OauthCallback,
  Cart,
  Purchase,
  OrdersList,
} from './pages';

import { OpenAPI } from './services/elibraryAPI';

import './index.css';

OpenAPI.BASE = process.env.REACT_APP_BACKEND_BASE_URL || '';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={BooksList} />
      <Route path="/collected" component={CollectedBooksList} />
      <Route path="/oauthCallback" component={OauthCallback} />
      <Route path="/userProfile" component={UserProfile} />
      <Route path="/cart" component={Cart} />
      <Route path="/purchase" component={Purchase} />
      <Route path="/orders" component={OrdersList} />
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
