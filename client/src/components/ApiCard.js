import React, { Component } from 'react';
import axios from 'axios'

class ApiCard extends Component {
    state = {
        user: {},
        deck: {},
        card: [{}],
    }
    async componentWillMount() {
        const userId = this.props.match.params.userId;
        console.log(userId)
        const deckId = this.props.match.params.deckId;
        console.log(deckId)
        const name = this.props.match.params.name
        console.log(name)
        const res = await axios.get(`/api/users/${userId}/decks/${deckId}`);
        const userRes = await axios.get(`/api/users/${userId}`);
        const apiRes = await axios.get(`/api/users/${userId}/decks/${deckId}/cards/search/${name}`)
        const user = userRes.data;
        const deck = res.data;
        const card = apiRes.data
        this.setState({ user, deck, card });
      }

    render() {
        return (
            <div>
                <h1>hey from api card</h1>
                {this.state.deck.name}
                {this.state.user.username}
                {console.log(this.state.card[0].name)}
                {this.state.card.map(card => (
                    <div>
                    {card.name}
                    <img src={card.imageUrl} alt={card.name}/>
                    </div>
                ))}
            </div>
        );
    }
}

export default ApiCard;