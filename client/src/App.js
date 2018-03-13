import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Users from './components/Users'
import SingleUser from './components/SingleUser'
import NavBar from './components/NavBar'
import LandingPage from './components/LandingPage'

class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <NavBar/>
        <Switch>
          <Route exact path='/' component={LandingPage}/>
          <Route exact path='/users' component={Users}/>
          <Route exact path='/users/:userId' component={SingleUser}/>
        </Switch>
      </div>
      </Router>
    );
  }
}

export default App;
