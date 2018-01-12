import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory, IndexRoute, Redirect } from 'react-router';
import App from './index';
import First from './nodes/firse/index';
import Dashboard from './nodes/dashboard/index';
import Second from './nodes/second/index';
//import createBrowserHistory from 'history/createBrowserHistory'

//const history = createBrowserHistory()
const Routes = () => <Router history={hashHistory}>
  <Route path="/" component={App}>
    <IndexRoute component={Dashboard} />
    <Route path="first" component={First}/>
    <Route path="second" component={Second}/>
  </Route>
</Router>;

render(<Routes/>, document.getElementById('root'));