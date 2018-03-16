import React, { Component } from "react";
import axios from "axios";
import NewDeckForm from "./NewDeckForm";
import EditUserForm from "./EditUserForm";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import ProfileImage from "./styledComponents/ProfileImage";
import styled from "styled-components";
import Decks from './Decks'

const FlexMaster = styled.div`
display: flex;
flex-direction: row;
justify-content: space-around;
`

const FlexLeft = styled.div`
display: flex;
flex-direction: column;
`

const FlexRight = styled.div`
display: flex;
flex-direction: column;
`

class SingleUser extends Component {
  state = {
    user: {
      decks: [],
      newDeckForm: false,
      editUserForm: false
    },
    redirect: false,
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
          <Link to={`/users/${this.state.user._id}/decks`}>
            <button>See user decks</button>
          </Link>
          </div>
          <div>
          <button onClick={this.toggleEditUserForm}>Edit User</button>
          {this.state.editUserForm ? (
            <EditUserForm updateUser={this.updateUser} user={this.state.user} />
          ) : null}
        </div>
        <div>
          <button onClick={this.remove}>Delete</button>
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

          <Decks userId={this.props.match.params.userId}
          toggleNewDeckForm={this.toggleNewDeckForm}
          newDeck={this.state.newDeck}/>

      </FlexMaster>
    );
  }
}

export default SingleUser;
