import React from 'react';
import Task from './Task.js';

class TaskList extends React.Component {
    render() {
        let tasks = this.props.tasks.map((task, index) => {
            return <Task task={task}
                         key={index}
                         indices={[index]}
                         onDeleteClicked={(e, indices) => { this.props.removeItem(indices) }}></Task>
        });

        return (
            <ul>{tasks}</ul>
        )
    }
}

export default TaskList;