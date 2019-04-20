import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';

import AddUser from './components/AddUser';
import Search from './components/Search';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="text-center my-5">Coral Blockchain | Internship Challenge</h1>
        <div className="container">
          <div className="links mb-4">
            <NavLink className='btn btn-primary mr-3' to='/'>Add UserData</NavLink>
            <NavLink className='btn btn-primary mr-3' to='/search/'>Search</NavLink>
          </div>
          <Switch>
            <Route path='/search/' component={Search} />
            <Route path='/' component={AddUser} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
