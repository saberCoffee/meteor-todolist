import React from 'react';
import { Router, Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

// route components
import HomePageContainer from '../../ui/containers/HomePageContainer.js';
import ListPageContainer from '../../ui/containers/ListPageContainer.js';

export const renderRoutes = () => (
  <Router history={createBrowserHistory()}>
    <Switch>
      <Route exact path="/" component={HomePageContainer} />
      <Route exact path="/list/:id" component={ListPageContainer} />
    </Switch>
  </Router>
);