import React, { Component } from 'react';

class AddCardForm extends Component {
    render() {
        return (
            <div>
                <form>
                    <input type="text"/>
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default AddCardForm;