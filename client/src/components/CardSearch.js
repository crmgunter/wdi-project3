import React, { Component } from "react";
import axios from "axios";
import CardShow from "./CardShow";

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
          <h1>hey from card search</h1>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                onChange={this.handleChange}
                value={this.state.name}
              />
              <button>Submit</button>
            </div>
          </form>
        </div>

        <CardShow 
        name={this.state.name}
        cards={this.state.cards}
        userId={this.props.userId}
        deckId={this.props.deckId}
        move={this.props.move}
        getDeck={this.props.getDeck}
        />
      </div>
    );
  }
}

export default CardSearch;
