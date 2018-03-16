import React, { Component } from "react";
import axios from "axios";
import CardShow from "./CardShow";
import { Button } from 'semantic-ui-react'

class CardSearch extends Component {
  state = {
    name: "",
    cards: [{}]
  };

  handleChange = event => {
    const newState = { ...this.state };
    newState[event.target.name] = event.target.value;
    this.setState(newState);
    console.log(this.state);
  };

  handleSubmit = async event => {
    event.preventDefault();
    const userId = this.props.userId;
    const deckId = this.props.deckId;
    const name = this.state.name;
    console.log(this.state);
    const res = await axios.get(
      `/api/users/${userId}/decks/${deckId}/cards/search/${name}`
    );

    console.log(res.data);
    const cards = res.data;
    this.setState({ cards });
  };

  render() {
    return (
      <div>
        <div>
          <p>Search for card by name:</p>
          <form onSubmit={this.handleSubmit}>
            <div>
              <input
                type="text"
                name="name"
                onChange={this.handleChange}
                placeholder="Search for card by name"
                value={this.state.name}
              />
              <div>
              <Button>Submit</Button>
              </div>
            </div>
          </form>
        </div>

        <CardShow 
        name={this.state.name}
        cards={this.state.cards}
        userId={this.props.userId}
        deckId={this.props.deckId}
        getDeck={this.props.getDeck}
        />
      </div>
    );
  }
}

export default CardSearch;
