// import React, { Component } from "react";
// import axios from "axios";
// import CardSearch from "./CardSearch";
// import CardShow from './CardShow'

// class ApiCard extends Component {
//   state = {
//     user: {},
//     deck: {},
//     card: [{}],
//   };
//   async componentWillMount() {
//     const userId = this.props.match.params.userId;
//     const deckId = this.props.match.params.deckId;
//     const name = this.props.match.params.name;
//     const res = await axios.get(`/api/users/${userId}/decks/${deckId}`);
//     const userRes = await axios.get(`/api/users/${userId}`);
//     const apiRes = await axios.get(
//       `/api/users/${userId}/decks/${deckId}/cards/search/${name}`
//     );
//     const user = userRes.data;
//     const deck = res.data;
//     const card = apiRes.data;
//     this.setState({ user, deck, card });
//   }

//   render() {
//     return (
//       <div>
//         <h1>hey from api card</h1>
//         <CardSearch
//           user={this.state.user}
//           deck={this.state.deck}
//           card={this.state.card}
//           name={this.props.match.params.name}
//           handleChange={this.handleChange}
//           handleSubmit={this.handleSubmit}
//         />
//       </div>
//     );
//   }
// }

// export default ApiCard;
