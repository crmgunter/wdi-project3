import React, { Component } from "react";
import axios from "axios";
import NewDeckForm from './NewDeckForm'
import EditUserForm from './EditUserForm'

class SingleUser extends Component {
  state = {
    user: {
      decks: [],
      newDeckForm: false,
      editUserForm: false
    }
  };

  async componentWillMount() {
    const userId = this.props.match.params.userId;
    const res = await axios.get(`/api/users/${userId}`);
    const user = res.data;
    this.setState({ user });
    console.log(this.state.user);
  }

  toggleNewDeckForm = () => {
    this.setState({ newDeckForm: !this.state.newDeckForm })
  }

  toggleEditUserForm = () => {
    this.setState({ editUserForm: !this.state.editUserForm })
  }

  remove() {
    this.props.deleteUser(this.props.user._id)
  }

  render() {
    return (
      <div>
        <h1>hey from single user</h1>
        {this.state.user.username}
        {this.state.user.decks.map(deck => (
          <div key={deck._id}>
            <h3>{deck.name}</h3>
            <h5>{deck.description}</h5>
          </div>
        ))}

        <div>
          <button onClick={this.toggleNewDeckForm}>Add new deck</button>
          {this.state.newDeckForm ? <NewDeckForm /> : null}
        </div>
        <div>
          <button onClick={this.toggleEditUserForm}>Edit this shit</button>
          {this.state.editUserForm ? <EditUserForm/> : null}
        </div>
        <div>
          <button onClick={this.props.deleteUser}>Delete this shit</button>
        </div>
      </div>
    );
  }
}

export default SingleUser;
