import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EditDeck from "./EditDeck";
import CardSearch from "./CardSearch";
import styled from "styled-components";
import ProfileImage from "./styledComponents/ProfileImage";
import { Button } from "semantic-ui-react";

const FlexContainer = styled.div`
  margin: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const FlexLeft = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  float: left;
  background: rgba(0, 0, 0, 0.8);
  width: 40vw;
  border-radius: 6px;
  box-shadow: 6px 6px 6px black;
`;

const FlexRight = styled.div`
  display: flex;
  flex-direction: row;
  background: #5c4e31;
  height: 100vh;
  width: 50vw;
  position: fixed;
  right: 20px;
  top: 128px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 6px;
  box-shadow: 6px 6px 6px black; 
  
  p {
    cursor: pointer;
    color: red;
  }
`;

const FlexImage = styled.div`
  margin: auto;
  text-align: center;
`;

const CardFlexCenter = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
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
  };

  hoverTest = () => {
    console.log("yay");
  };

  toggleEditDeck = () => {
    this.setState({ editDeckForm: !this.state.editDeckForm });
  };

  toggleDeleteConfirm = () => {
    this.setState({ deleteConfirm: !this.state.deleteConfirm });
  };

  remove = async index => {
    const userId = this.props.match.params.userId;
    const deckId = this.props.match.params.deckId;
    const cardId = this.state.deck.cards[index]._id;
    console.log(cardId);
    await axios.delete(`/api/users/${userId}/decks/${deckId}/cards/${cardId}`);
    const res = await axios.get(`/api/users/${userId}/decks/${deckId}`);
    const deck = res.data;
    this.setState({ deck });
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
            <Button onClick={this.toggleEditDeck}>Edit Deck</Button>
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
            getDeck={this.getDeck}
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
