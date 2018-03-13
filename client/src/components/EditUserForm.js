import React, { Component } from 'react';
import axios from 'axios'

class EditUserForm extends Component {
    state = {
        user: {}
    }

    handleChange = (event) => {
        const newUser = [ ...this.props.user ]
        const change = event.target.name
        newUser[change] = event.target.value
        this.setState({user: change})
        console.log(this.state)
    }

    updateUser = (user) => {
        const userId = this.props.match.params.userId
        console.log(userId)
        axios.patch(`/api/users/${userId}`).then(res => {
          this.setState({ user: res.data.user})
        })
      }

    render() {
        return (
            <div>
                <h1>hiya</h1>
                <form onSubmit={this.updateUser}>
                <input type='text' name='username' value={this.props.user.username}
                onChange={this.handleChange}
                />
                <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default EditUserForm;