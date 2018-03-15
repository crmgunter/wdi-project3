import React, { Component } from 'react';
import axios from 'axios'

class AddCardForm extends Component {
    state = {
        user: {},
        name: '',
        artist: ''
    }

    
    handleChange = (event) => {
        const newState = { ...this.state }
        newState[ event.target.name ] = event.target.value
        this.setState(newState)
    }

    handleSubmit = async event => {
        event.preventDefault();
        const userId = this.props.userId;
        const deckId = this.props.deckId;
        const payload = {
          name: this.state.name,
          artist: this.state.artist
        };
        console.log(this.state);
        await axios.post(`/api/users/${userId}/decks/${deckId}/cards`, payload);
      };

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" onChange={this.handleChange} value={this.state.name}/>
                    <label htmlFor="artist">Artist</label>
                    <input type="text" name="artist" onChange={this.handleChange} value={this.state.artist}/>
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default AddCardForm;