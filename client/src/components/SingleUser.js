import React, { Component } from "react";
import axios from "axios";
import NewDeckForm from "./NewDeckForm";
import EditUserForm from "./EditUserForm";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import ProfileImage from "./styledComponents/ProfileImage";
import styled from "styled-components";
import Decks from "./Decks";

const FlexMaster = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const FlexLeft = styled.div`
  display: flex;
  flex-direction: column;
`;

const FlexRight = styled.div`
  display: flex;
  flex-direction: column;
  width: 65vw;
  align-items: center;
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
            <button onClick={this.toggleEditUserForm}>Edit User</button>
            {this.state.editUserForm ? (
              <EditUserForm
                updateUser={this.updateUser}
                user={this.state.user}
              />
            ) : null}
          </div>
          <div>
            <button onClick={this.toggleDeleteConfirm}>Delete</button>
            {this.state.deleteConfirm ? 
              (
                <div>
                <p>Are you sure you want to delete this user?</p>
              <button onClick={this.remove}>Yes</button>
              <button onClick={this.toggleDeleteConfirm}>Nevermind</button>
              </div>
            ) 
              : null}
          </div>
          {this.state.user.decks.map(deck => (
            <div key={deck._id}>
              <h3>{deck.name}</h3>
              <h5>{deck.description}</h5>
              <h5>{deck.archetype}</h5>
              <h5>{deck.format}</h5>
            </div>
          ))}
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
