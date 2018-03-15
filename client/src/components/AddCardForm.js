import React, { Component } from "react";
import axios from "axios";

class AddCardForm extends Component {
  state = {
    user: {},
    name: "",
    color: "",
    cmc: "",
    rarity: "",
    set: "",
    artist: "",
    img: ""
  };

  handleChange = event => {
    const newState = { ...this.state };
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  };

  handleSubmit = async event => {
    event.preventDefault();
    const userId = this.props.userId;
    const deckId = this.props.deckId;
    const payload = {
      name: this.state.name,
      color: this.state.color,
      cmc: this.state.cmc,
      rarity: this.state.rarity,
      set: this.state.set,
      artist: this.state.artist,
      img: this.state.img
    };
    console.log(this.state);
    await axios.post(`/api/users/${userId}/decks/${deckId}/cards`, payload);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </div>
          <div>
            <label htmlFor="color">color</label>
            <input
              type="text"
              name="color"
              onChange={this.handleChange}
              value={this.state.color}
            />
          </div>
          <div>
            <label htmlFor="cmc">cmc</label>
            <input
              type="text"
              name="cmc"
              onChange={this.handleChange}
              value={this.state.cmc}
            />
          </div>
          <div>
            <label htmlFor="rarity">rarity</label>
            <input
              type="text"
              name="rarity"
              onChange={this.handleChange}
              value={this.state.rarity}
            />
          </div>
          <div>
            <label htmlFor="set">set</label>
            <input
              type="text"
              name="set"
              onChange={this.handleChange}
              value={this.state.set}
            />
          </div>
          <div>
            <label htmlFor="artist">Artist</label>
            <input
              type="text"
              name="artist"
              onChange={this.handleChange}
              value={this.state.artist}
            />
          </div>
          <div>
            <label htmlFor="img">Image URL</label>
            <input
              type="text"
              name="img"
              onChange={this.handleChange}
              value={this.state.img}
            />
          </div>

          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default AddCardForm;
