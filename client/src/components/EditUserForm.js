import React, { Component } from 'react';
import axios from 'axios'

class EditUserForm extends Component {
    state = {
        user: {
        username: '',
        image: ''
        }
    }

    

    // componentDidMount() {
    //     const user = this.props
    //     this.setState({ user })
    // }

    updateUser = (event) => {
        event.preventDefault()
        const userId = this.props.user._id
        console.log(userId)
        const payload = this.state.user
        axios.patch(`/api/users/${userId}`, payload).then(res => {
        this.setState({ user: res.data})
        })
      }

      handleChange = (event) => {
        const newUser = { ...this.props.user }
        newUser[event.target.name] = event.target.value
        this.setState({ user: newUser })
        console.log(this.state)
    }

    render() {
        return (
            <div>
                <h1>hiya</h1>
                <form onSubmit={this.updateUser}>
                <div>
                <label htmlFor="name">Name</label>
                <input type='text' 
                name='username' 
                value={this.state.user.username}
                placeholder={this.props.user.username}
                onChange={this.handleChange}
                />
                </div>
                <div>
                <label htmlFor="image">image URL</label>
                <input type='text' 
                name='image' 
                value={this.state.user.image}
                placeholder={this.props.user.image}
                onChange={this.handleChange}
                />
                </div>

                <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default EditUserForm;