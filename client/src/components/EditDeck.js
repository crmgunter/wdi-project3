import React, { Component } from "react";
import axios from 'axios'
import { Button } from 'semantic-ui-react'
 
class EditDeck extends Component {
  state = {
    name: "",
    description: "",
    archetype: "",
    format: ""
  };

  handleChange = event => {
    const name = event.target.name;
    const newState = { ...this.state };
    newState[name] = event.target.value;
    this.setState(newState);
  };

  handleSubmit = async event => {
    const userId = this.props.userId;
    const deckId = this.props.deckId
    event.preventDefault();
    const payload = {
      name: this.state.name,
      description: this.state.description,
      archetype: this.state.archetype,
      format: this.state.format
    };
    console.log(this.state);
    await axios.patch(`/api/users/${userId}/decks/${deckId}`, payload);
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
              value={this.state.name}
              placeholder={this.state.name}
            />
          </div>
          <div>
            <label htmlFor="description">Description: </label>
            <textarea
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
              value={this.state.archetype}
            />
          </div>
          <div>
            <label htmlFor="format">format: </label>
            <input
              onChange={this.handleChange}
              type="text"
              name="format"
              value={this.state.format}
            />
          </div>
          <Button>Submit</Button>
        </form>
      </div>
    );
  }
}

export default EditDeck;
