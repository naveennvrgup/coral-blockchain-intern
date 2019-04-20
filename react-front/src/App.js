import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddUser from './components/AddUser';   

class App extends Component {
  render() {
    return (
      <div className="App">
        <AddUser/>
      </div>
    );
  }
}

export default App;
