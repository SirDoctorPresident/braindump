import React from 'react';
import Task from './Task.js';

class TaskList extends React.Component {
    render() {
        let tasks = this.props.tasks.map((task, index) => {
            return <Task task={task}
                         key={index}
                         indices={[index]}
                         onDeleteClicked={(indices) => { this.props.removeItem(indices) }}
                         selectTask={(indices)=>{this.props.selectTask(indices)}}></Task>
        });

        return (
            <ul>{tasks}</ul>
        )
    }
}

export default TaskList;