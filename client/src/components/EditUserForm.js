import React, { Component } from 'react';
import axios from 'axios'
import { Button } from 'semantic-ui-react'

class EditUserForm extends Component {
    state = {
        user: {
        username: '',
        image: ''
        }
    }

    

    componentDidMount() {
        this.updateUser()
    }

    updateUser = (event) => {
        const userId = this.props.user._id
        console.log(userId)
        const payload = this.state.user
        axios.patch(`/api/users/${userId}`, payload).then(res => {
        this.setState({ user: res.data})
        })
        // this.props.updateUser()
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
                <form onSubmit={this.updateUser}>
                <div>
                <label htmlFor="name">Name</label>
                <input type='text' 
                name='username' 
                required
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

                <Button>Submit</Button>
                </form>
            </div>
        );
    }
}

export default EditUserForm;