import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'


class Users extends Component {
    state = {
        users: []
    }
    componentWillMount() {
        this.getAllUsers()
    }
    getAllUsers = async () => {
        const res = await axios.get('/api/users')
        this.setState({users: res.data})
    }
    
    render() {
        return (
            <div>
                <h1>hey from users</h1>
                {this.state.users.map(user => (
                    <Link key={user._id} to={`users/${user._id}`}>
                    <h3>Username: {user.username}</h3>
                    </Link>
                ))}
            </div>
        );
    }
}

export default Users;