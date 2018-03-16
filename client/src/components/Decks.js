import React, { Component } from "react";
import axios from "axios";
import NewDeckForm from "./NewDeckForm";
import { Link } from "react-router-dom";
import { Button } from 'semantic-ui-react'

class Decks extends Component {
  state = {
    user: {
      decks: []
    },
    newDeck: false,
    deleteConfirm: false
  };

  async componentWillMount() {
    //UNDO STOP HERE
    const userId = this.props.userId;
    const res = await axios.get(`/api/users/${userId}`);
    const user = res.data;
    this.setState({ user });
    console.log(this.state.user.decks);
  }

  toggleNewDeckForm = () => {
    this.setState({ newDeck: !this.state.newDeck });
  };

  toggleDeleteConfirm = i => {
    this.setState({ deleteConfirm: !this.state.deleteConfirm });
  };

  remove = index => {
    const userId = this.props.userId;
    const deckId = this.state.user.decks[index]._id;
    console.log(deckId);
    axios
      .delete(`/api/users/${userId}/decks/${deckId}`)
      .then(res => {})
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <h1>Hey from decks!</h1>
        <div>
          <Button onClick={this.toggleNewDeckForm}>Add New Deck</Button>
          {this.state.newDeck ? (
            <NewDeckForm userId={this.props.userId} />
          ) : null}
        </div>
        {this.state.user.username}'s decks
        {this.state.user.decks.map((deck, i) => (
          <div key={deck._id}>
            <Link to={`/users/${this.state.user._id}/decks/${deck._id}`}>
              <h3>{deck.name}</h3>
            </Link>
            <h5>{deck.description}</h5>
            <h5>{deck.archetype}</h5>
            <h5>{deck.format}</h5>
            <Button onClick={() => this.toggleDeleteConfirm(i)}>Delete</Button>
            {this.state.deleteConfirm ? (
              <div>
                <p>Are you sure you want to delete this deck?</p>
                <Button onClick={()=> this.remove(i)}>Yes, this deck is terrible</Button>
                <Button onClick={()=> this.toggleDeleteConfirm(i)}>Nevermind</Button>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    );
  }
}

export default Decks;
