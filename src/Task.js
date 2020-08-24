import React from 'react';

class Task extends React.Component {

    propogateDeleteCall(e, indices) {
        console.log('Clicked ' + indices);
        this.props.onDeleteClicked(e, indices);
    }

    render() {
        let subtasks = this.props.task.subtasks.map((task, index) => {
            let indices = [...this.props.indices, index];

            return <Task task={task}
                         indices={indices}
                         key={index}
                         onDeleteClicked={(e, indices) => { this.propogateDeleteCall(e, indices) }}>
            </Task>
        });

        return (
            <li>
                <input type="checkbox" defaultChecked={this.props.task.completed} />
                <span>{this.props.task.text}</span>
                <span className="fas fa-times-circle"
                    onClick={(e) => { this.props.onDeleteClicked(e, this.props.indices) }}></span>
                <ul>
                    {subtasks}
                </ul>
            </li>
        )
    }
}

export default Task;