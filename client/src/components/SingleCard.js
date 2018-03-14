import React, { Component } from 'react';
import axios from 'axios'

class SingleCard extends Component {
    state = {
        user: {},
        deck: {
            cards:[]
        }
      };
    
      async componentWillMount() {
        const userId = this.props.match.params.userId;
        const deckId = this.props.match.params.deckId;
        const cardId = this.props.match.params.cardId;
        const res = await axios.get(`/api/users/${userId}/decks/${deckId}`);
        const userRes = await axios.get(`/api/users/${userId}`);
        const user = userRes.data;
        const deck = res.data;
        this.setState({ user, deck });
      }

    render() {
        return (
            <div>
                <h1>hey from single Card!</h1>
            </div>
        );
    }
}

export default SingleCard;