import React from 'react';
import { Router, IndexRoute } from 'react-router';
import { createHistory } from 'history';
import Ivenues from './Ivenues';
import Home from './Home';

const rootPath = '/';

const onRouteUpdate = function () {
  let docElements = document.querySelectorAll('.article');
  if (docElements.length > 0 && window.location.hash === '') {
    docElements[0].scrollTop = 0;
  }
};

const routes = (
  <Router onUpdate={onRouteUpdate} history={createHistory()} >
    <Router path={rootPath} component={Ivenues}>
      <IndexRoute component={Home} />
    </Router>
  </Router>
);

export default routes;