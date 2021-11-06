import React from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
import SearchContainer from './containers/SearchContainer';

export const history = createBrowserHistory();

const Routes = () => (
  <Router history={history}>
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={SearchContainer} />
      </Switch>
    </React.Fragment>
  </Router >
);

export default Routes;

