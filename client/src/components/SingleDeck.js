import React, { Component } from 'react';

class SingleDeck extends Component {
    render() {
        return (
            <div>
                <h1>Hey from Single Decks!</h1>
                {this.props.user.decks}
            </div>
        );
    }
}

export default SingleDeck;