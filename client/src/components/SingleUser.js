import React, { Component } from "react";
import axios from "axios";
import NewDeckForm from "./NewDeckForm";
import EditUserForm from "./EditUserForm";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import ProfileImage from "./styledComponents/ProfileImage";
import styled from "styled-components";
import Decks from "./Decks";
import { Button } from 'semantic-ui-react'

const FlexMaster = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 20px 0;
`;

const FlexLeft = styled.div`
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, .8);
  width: 30vw;
  border-radius: 6px;
  box-shadow: 6px 6px 6px black;
`;

const FlexRight = styled.div`
  display: flex;
  flex-direction: column;
  width: 65vw;
  align-items: center;
  background: rgba(0, 0, 0, .8);
  border-radius: 6px;
  box-shadow: 6px 6px 6px black;
  padding: 20px 0;
`;

class SingleUser extends Component {
  state = {
    user: {
      decks: [],
      newDeckForm: false,
      editUserForm: false
    },
    redirect: false,
    deleteConfirm: false
  };

  async componentDidMount() {
    this.updateUser();
  }

  updateUser = async () => {
    const userId = this.props.match.params.userId;
    const res = await axios.get(`/api/users/${userId}`);
    const user = res.data;
    this.setState({ user });
    console.log(this.state.user);
  };

  toggleNewDeckForm = () => {
    this.setState({ newDeckForm: !this.state.newDeckForm });
  };

  toggleEditUserForm = () => {
    this.setState({ editUserForm: !this.state.editUserForm });
  };

  toggleDeleteConfirm = () => {
    this.setState({ deleteConfirm: !this.state.deleteConfirm})
  }

  remove = () => {
    const userId = this.props.match.params.userId;
    this.setState({ redirect: true });
    axios.delete(`/api/users/${userId}`).catch(err => {
      console.log(err);
    });
  };

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/users" />;
    }

    return (
      <FlexMaster>
        <FlexLeft>
          <div>
            <ProfileImage src={this.state.user.image} alt="user" />
            <div>
              <h3>{this.state.user.username}</h3>
            </div>
          </div>
          <div>
            <Button onClick={this.toggleEditUserForm}>Edit User</Button>
            {this.state.editUserForm ? (
              <EditUserForm
                updateUser={this.updateUser}
                user={this.state.user}
              />
            ) : null}
          </div>
          <div>
            <Button onClick={this.toggleDeleteConfirm}>Delete</Button>
            {this.state.deleteConfirm ? 
              (
                <div>
                <p>Are you sure you want to delete this user?</p>
              <Button onClick={this.remove}>Yes</Button>
              <Button onClick={this.toggleDeleteConfirm}>Nevermind</Button>
              </div>
            ) 
              : null}
          </div>
          {/* {this.state.user.decks.map(deck => (
            <div key={deck._id}>
              <h3>{deck.name}</h3>
              <h5>{deck.description}</h5>
              <h5>{deck.archetype}</h5>
              <h5>{deck.format}</h5>
            </div>
          ))} */}
        </FlexLeft>

        <FlexRight>
          <Decks
            userId={this.props.match.params.userId}
            deckId={this.props.match.params.deckId}
            toggleNewDeckForm={this.toggleNewDeckForm}
            newDeck={this.state.newDeck}
          />
        </FlexRight>
      </FlexMaster>
    );
  }
}

export default SingleUser;
