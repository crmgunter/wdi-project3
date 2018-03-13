import React, { Component } from "react";
import axios from 'axios'

class NewUserForm extends Component {
  state = {
    username: ''
  };

  handleChange = (event) => {
      const username = event.target.username
      const newState = {...this.state}
      newState[username] = event.target.value
      console.log(newState)
      this.setState(newState)
      console.log(newState[username])
  }

  handleSubmit = async (event) => {
      event.preventDefault()
      const payload = {
          username: this.state.username
      }
      await axios.post('/api/users', payload)
      await this.props.getAllUsers()
      console.log(this.state)
  }

  render() {
    return (
      <div>
        <h1>hey</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="username">Username: </label>
            <input onChange={this.handleChange} type="text" name="username" value={this.state.username} />
          </div>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default NewUserForm;
