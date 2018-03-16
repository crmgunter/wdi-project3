import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { injectGlobal } from 'styled-components'
import Users from './components/Users'
import SingleUser from './components/SingleUser'
import NavBar from './components/NavBar'
import LandingPage from './components/LandingPage'
import Decks from './components/Decks'
import SingleDeck from './components/SingleDeck'
import SingleCard from './components/SingleCard'
import CardSearch from './components/CardSearch'
import styled from 'styled-components'
// below is how to import google fonts
injectGlobal`
@import url('https://fonts.googleapis.com/css?family=Roboto');
`
const GeneralStyles = styled.body`
/* text-align: center; */
margin: 0;
font-family: 'Roboto', sans-serif;

a {
    margin: auto;
    text-decoration: none;
    color: green;
  }

  button {
    border-radius: 5px;
    height: 30px;
  }
`


class App extends Component {
  render() {
    return (
      <Router>
        <GeneralStyles>
        <NavBar/>
        <Switch>
          <Route exact path='/' component={LandingPage}/>
          <Route exact path='/users' component={Users}/>
          <Route exact path='/users/:userId' component={SingleUser}/>
          {/* <Route exact path='/users/:userId/decks/' component={Decks}/> */}
          <Route exact path='/users/:userId/decks/:deckId' component={SingleDeck}/>
          <Route exact path='/users/:userId/decks/:deckId/cards/:cardId' component={SingleCard}/>
          <Route exact path='/users/:userId/decks/:deckId/cards/search/:name' component={CardSearch}/>
        </Switch>
        </GeneralStyles>
      </Router>
    );
  }
}

export default App;
