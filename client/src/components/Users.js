import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NewUserForm from "./NewUserForm";
import ProfileImage from "./styledComponents/ProfileImage";
import styled from "styled-components";
import { Button } from 'semantic-ui-react'

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  text-align: center;
`;

const FlexContent = styled.div`
background-size: cover;
flex-direction: row;
margin: 20px;
background: url('http://www.spelplus.com/postpic/2011/12/blank-magic-card-template_314403.jpg');
background-size: 100%;
background-repeat: no-repeat;
width: 300px;
height: 500px;

h3 {
  margin: 70px 0 0 0;
}
`
const ButtonPosition = styled.div`
text-align: center;
margin: 20px;
`



class Users extends Component {
  state = {
    users: [],
    showForm: false
  };

  componentWillMount() {
    this.getAllUsers();
  }
  getAllUsers = async () => {
    const res = await axios.get("/api/users");
    this.setState({ users: res.data });
  };

  toggleNewForm = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  render() {
    return (
      <div>
        <ButtonPosition>
        <Button onClick={this.toggleNewForm}>Add new user</Button>
        </ButtonPosition>
        {this.state.showForm ? (
          <NewUserForm getAllUsers={this.getAllUsers} />
        ) : null}
        <FlexContainer>
        {this.state.users.map(user => (
          <div key={user._id}>
            <FlexContent>
              <Link to={`users/${user._id}`}>
                <ProfileImage src={user.image} alt="user" />
                <h3>{user.username}</h3>
              </Link>
            </FlexContent>
          </div>
        ))}
        </FlexContainer>
      </div>
    );
  }
}

export default Users;
