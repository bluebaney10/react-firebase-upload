import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './AppNews'
import Edit from './components/Edit'
import Create from './components/Create'
import Show from './components/Show'
import Menu from './components/Menu'
import View from './components/View'
//import 'bulma/css/bulma.css'
//import './bulma'





ReactDOM.render(
  
 
  <Router>
     
      <div>
        <Menu />
        <Route exact path='/' component={App} />
        <Route path='/edit/:id' component={Edit} />
        <Route path='/create' component={Create} />
        <Route path='/view' component={View} />
        <Route path='/show/:id' component={Show} />
      </div>
  </Router>,
  document.getElementById('root')
);