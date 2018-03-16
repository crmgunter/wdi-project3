import React, { Component } from "react";
import axios from "axios";

class NewDeckForm extends Component {
  state = {
    name: "",
    description: "",
    archetype: "",
    format: ""
  };

  componentWillMount() {
    this.getAllDecks();
  }

  getAllDecks = async () => {
    const userId = this.props.userId;
    const res = await axios.get(`/api/users/${userId}/decks`);
    this.setState({ user: res.data });
  };

  handleChange = event => {
    const name = event.target.name;
    const newState = { ...this.state };
    newState[name] = event.target.value;
    this.setState(newState);
  };

  handleSubmit = async event => {
    const userId = this.props.userId;
    console.log(userId);
    event.preventDefault();
    const payload = {
      name: this.state.name,
      description: this.state.description,
      archetype: this.state.archetype,
      format: this.state.format
    };
    console.log(this.state);
    await axios.post(`/api/users/${userId}/decks`, payload);
    await this.getAllDecks();
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name">name: </label>
            <input
              onChange={this.handleChange}
              type="text"
              name="name"
              required
              value={this.state.name}
            />
          </div>
          <div>
            <label htmlFor="description">Description: </label>
            <input
              onChange={this.handleChange}
              type="text"
              name="description"
              value={this.state.description}
            />
          </div>
          <div>
            <label htmlFor="archetype">archetype: </label>
            <input
              onChange={this.handleChange}
              type="text"
              name="archetype"
              required
              value={this.state.archetype}
            />
          </div>
          <div>
            <label htmlFor="format">format: </label>
            <input
              onChange={this.handleChange}
              type="text"
              name="format"
              required
              value={this.state.format}
            />
          </div>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default NewDeckForm;
