import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddCardForm from "./AddCardForm";
import EditDeck from "./EditDeck";
import CardSearch from "./CardSearch";

class SingleDeck extends Component {
  state = {
    user: {},
    deck: {
      cards: []
    },
    addCardForm: false,
    editDeckForm: false
  };

  async componentWillMount() {
    const userId = this.props.match.params.userId;
    const deckId = this.props.match.params.deckId;
    const res = await axios.get(`/api/users/${userId}/decks/${deckId}`);
    const userRes = await axios.get(`/api/users/${userId}`);
    const user = userRes.data;
    const deck = res.data;
    this.setState({ user, deck });
  }

  hoverTest = () => {
    console.log("yay");
  };

  toggleAddCard = () => {
    this.setState({ addCardForm: !this.state.addCardForm });
  };

  toggleEditDeck = () => {
    this.setState({ editDeckForm: !this.state.editDeckForm });
  };

  remove = index => {
    const userId = this.props.match.params.userId;
    const deckId = this.props.match.params.deckId;
    const cardId = this.state.deck.cards[index]._id;
    console.log(cardId);
    axios
      .delete(`/api/users/${userId}/decks/${deckId}/cards/${cardId}`)
      .then(res => {})
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <h1>Hey from Single Deck!</h1>
        <button onClick={this.toggleEditDeck}>Edit Deck</button>
        {this.state.editDeckForm ? (
          <EditDeck
            userId={this.props.match.params.userId}
            deckId={this.props.match.params.deckId}
          />
        ) : null}
        <button onClick={this.toggleAddCard}>Add Card</button>
        {this.state.addCardForm ? (
          <AddCardForm
            userId={this.props.match.params.userId}
            deckId={this.props.match.params.deckId}
          />
        ) : null}
        <CardSearch
          // userDeck={this.state.user}
          // deckToAddCard={this.state.deck}
          // cardsToAdd={this.state.deck.cards}
          userId={this.props.match.params.userId}
          deckId={this.props.match.params.deckId}
        />
        <div>{this.state.user.username}'s deck</div>
        <div>{this.state.deck.name}</div>
        <div>{this.state.deck.description}</div>
        <div>{this.state.deck.archetype}</div>
        <div>{this.state.deck.format}</div>
        {this.state.deck.cards.map((card, index) => (
          <div key={card._id}>
            {/* <div onMouseEnter={this.hoverTest}> */}
              <Link
                to={`/users/${this.state.user._id}/decks/${
                  this.state.deck._id
                }/cards/${card._id}`}
              >
                {card.name}
              </Link>
              <div onClick={() => this.remove(index)}>X</div>
            </div>
        //   </div>
        ))}
      </div>
    );
  }
}

export default SingleDeck;
