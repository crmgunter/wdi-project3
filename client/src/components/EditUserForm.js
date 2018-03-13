import React, { Component } from 'react';
import axios from 'axios'

class EditUserForm extends Component {
    state = {
        user: ''
    }

    updateUser = (user) => {
        const userId = this.props.match.params.userId
        console.log(userId)
        axios.patch(`/api/users/${userId}`).then(res => {
          this.setState({ user: res.data.user})
        })
      }

    handleChange = (event) => {
        const userId = this.props.match.params.userId
        const change = event.target.value
        console.log(change)
        console.log('userId')
    }

    render() {
        return (
            <div>
                <h1>hiya</h1>
                <form onSubmit={this.updateUser}>
                <input type='text' name='title' value={this.props.user.username}
                onChange={this.handleChange}
                />
                <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default EditUserForm;