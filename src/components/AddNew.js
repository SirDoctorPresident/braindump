import React from 'react';

class AddNew extends React.Component {
    submitNewTask(e) {
        if (e.keyCode === 13) {
            this.props.addTask(e.target.value, this.props.index);
            e.target.value = '';
        }
    }

    render() {
        return (
            <input type="text"
                className="primary-add"
                placeholder="Add a new task to 'TODO'"
                onKeyUp={(e) => this.submitNewTask(e)} 
                />
        )
    }
}

export default AddNew;