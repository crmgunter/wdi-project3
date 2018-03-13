import React, { Component } from 'react';
import axios from 'axios'

class SingleUser extends Component {
    state = {
        user: []
    }

    async componentWillMount() {
        const userId = this.props.match.params.userId
        const res = await axios.get(`/api/users/${userId}`)
        const user = res.data
        this.setState({user: user})
        console.log(this.state)
    }

    render() {
        return (
            <div>
                <h1>hey from single user</h1>
                {this.state.user.username}
            </div>
        );
    }
}

export default SingleUser;