import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory, IndexRoute, Redirect } from 'react-router';
import App from './index';
import First from './nodes/firse/index';
import Dashboard from './nodes/dashboard/index';
//import createBrowserHistory from 'history/createBrowserHistory'

//const history = createBrowserHistory()
const Routes = () => <Router history={hashHistory}>
  <Route path="/" component={App}>
    <IndexRoute component={Dashboard} />
    <Route path="first" component={First}/>
    <Route path="second" component={First}/>
    <Route path="third" component={First}/>
    <Route path="fourth" component={First}/>
  </Route>
</Router>;

render(<Routes/>, document.getElementById('root'));