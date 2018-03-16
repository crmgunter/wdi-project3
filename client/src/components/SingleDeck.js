import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddCardForm from "./AddCardForm";
import EditDeck from "./EditDeck";
import CardSearch from "./CardSearch";
import styled from "styled-components";
import ProfileImage from "./styledComponents/ProfileImage";

const FlexContainer = styled.div`
  /* display: flex; */
  /* flex-direction: row; */
  /* justify-content: space-around; */
  /* flex-wrap: wrap-reverse; */
  margin: 30px;
`;

const FlexLeft = styled.div`
  float: left;
  /* display: flex; */
  /* flex-direction: column; */
  background: #5c4e31;
  width: 40vw;
`;
const FlexRight = styled.div`
  display: flex;
  flex-direction: column;
  background: #5c4e31;
  height: 100vh;
  width: 50vw;
  position: fixed; 
  right: 20px;
  top: 120px;  

  p {
    cursor: pointer;
    color: red;
  }
`;

const FlexImage = styled.div`
  display: flex;
  margin: auto;
  text-align: center;
`;

const CardFlexCenter = styled.div`
  margin-left: 20px;
`;

class SingleDeck extends Component {
  state = {
    user: {},
    deck: {
      cards: []
    },
    editDeckForm: false,
    deleteConfirm: false
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

  getDeck = async () => {
    const userId = this.props.match.params.userId;
    const deckId = this.props.match.params.deckId;
    const res = await axios.get(`/api/users/${userId}/decks/${deckId}`);
    const deck = res.data;
    this.setState({ deck });
  }

  moveToDeckList = (index) => {
      const cards = { ...this.state.deck.cards[index]}
      const newCardList = [ ...this.state.deck.cards]

      newCardList.push(cards)

      this.setState({ cards: newCardList })

  }

  hoverTest = () => {
    console.log("yay");
  };

  toggleEditDeck = () => {
    this.setState({ editDeckForm: !this.state.editDeckForm });
  };

  toggleDeleteConfirm = () => {
    this.setState({ deleteConfirm: !this.state.deleteConfirm });
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
      <FlexContainer>
        <FlexLeft>
          <FlexImage>
            <ProfileImage
              src={this.state.user.image}
              alt={this.state.user.username}
            />
          </FlexImage>
          <div>{this.state.user.username}</div>
          <div>{this.state.deck.name}</div>
          <div>{this.state.deck.description}</div>
          <div>{this.state.deck.archetype}</div>
          <div>{this.state.deck.format}</div>
          <div>
            <button onClick={this.toggleEditDeck}>Edit Deck</button>
            {this.state.editDeckForm ? (
              <EditDeck
                userId={this.props.match.params.userId}
                deckId={this.props.match.params.deckId}
              />
            ) : null}
          </div>
          <CardSearch
            userId={this.props.match.params.userId}
            deckId={this.props.match.params.deckId}
            move={this.moveToDeckList}
            getDeck = {this.getDeck}
          />
        </FlexLeft>

        <FlexRight>
          <CardFlexCenter>
            <h1>Cards</h1>
            {this.state.deck.cards.map((card, index) => (
              <div key={card._id}>
                <p onClick={() => this.remove(index)}>X</p>
                <Link
                  to={`/users/${this.state.user._id}/decks/${
                    this.state.deck._id
                  }/cards/${card._id}`}
                >
                  {card.name}
                </Link>
              </div>
            ))}
          </CardFlexCenter>
        </FlexRight>
      </FlexContainer>
    );
  }
}

export default SingleDeck;
