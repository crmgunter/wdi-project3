import React, { Component } from "react";
import axios from "axios";

class SingleUser extends Component {
  state = {
    user: {
      decks: []
    }
  };

  async componentWillMount() {
    const userId = this.props.match.params.userId;
    const res = await axios.get(`/api/users/${userId}`);
    const user = res.data;
    this.setState({ user });
    console.log(this.state.user);
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

        <button>Add new deck</button>
      </div>
    );
  }
}

export default SingleUser;
