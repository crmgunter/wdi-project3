import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.div`
  background: rgba(0, 0, 0, .8);
  height: 15vh;
  display: flex;
  box-shadow: 0 5px 5px #967b56;

  h1 {
    margin: auto;
    font-family: 'MedievalSharp', cursive;
  }

`;
const NavLink = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 0 20px 0 0;
`;

class NavBar extends Component {
  render() {
    return (
      <Nav>
        <h1>MTG Deck Builder</h1>
        <NavLink>
            <div>
          <Link to={"/"}>Home</Link>
          </div>
          <div>
          <Link to={"/users"}>Users</Link>
          </div>
        </NavLink>
      </Nav>
    );
  }
}

export default NavBar;
