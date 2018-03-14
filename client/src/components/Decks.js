import React, { Component } from 'react';
import axios from 'axios'

class Decks extends Component {
    state = {
        user: {
            decks: []
        }
    }

    async componentWillMount() {
        const userId = this.props.match.params.userId;
        const deckId = this.props.match.params.deckId
        const res = await axios.get(`/api/users/${userId}`);
        const user = res.data;
        this.setState({ user });
        console.log(this.state.user.decks);
      }

    render() {
        return (
            <div>
                <h1>Hey from decks!</h1>
                {this.state.user.username}'s decks
                {this.state.user.decks.map(deck => (
                    <div key={deck._id}>
                    <h3>{deck.name}</h3>
                    <h5>{deck.description}</h5>
                    <h5>{deck.archetype}</h5>
                    <h5>{deck.format}</h5>
                    </div>
                ))}
            </div>
        );
    }
}

export default Decks;