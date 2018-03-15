import React, { Component } from 'react';

class CardShow extends Component {
    render() {
        return (
            <div>
                <h1>hey from card show</h1>
                {this.props.cards.map((card) => (
                    <div>
                    {card.name}
                    <img src={card.imageUrl} alt={card.name}/>
                    </div>
                ))}
            </div>
        );
    }
}

export default CardShow;