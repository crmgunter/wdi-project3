import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NewUserForm from './NewUserForm'
import ProfileImage from './styledComponents/ProfileImage'

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
      this.setState({ showForm: !this.state.showForm })
  }

  render() {
    return (
        <div>
        <h1>hey from users</h1>
        <button onClick={this.toggleNewForm}>Add new user</button>
        {this.state.showForm ? (
            <NewUserForm getAllUsers={this.getAllUsers}/>
        ) : null}

        {this.state.users.map(user => (
            <div>
          <Link key={user._id} 
          to={`users/${user._id}`}>
            <ProfileImage src={user.image} alt="user"/>
            <h3>{user.username}</h3>
          </Link>
          </div>
        ))}
        </div>
    );
  }
}

export default Users;
