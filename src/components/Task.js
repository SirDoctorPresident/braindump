import React from 'react';

class Task extends React.Component {

    render() {
        let subtasks = this.props.task.subtasks.map((task, index) => {
            let indices = [...this.props.indices, index];

            return <Task task={task}
                         indices={indices}
                         key={index}
                         onDeleteClicked={(indexes) => { this.props.onDeleteClicked(indexes) }}
                         selectTask={(indices)=>{this.props.selectTask(indices)}}
                         toggleCompleted={(indices)=>{this.props.toggleCompleted(indices)}}>
                   </Task>
        });

        return (
            <li onClick={(e, indices)=>{e.stopPropagation(); this.props.selectTask(this.props.indices)}}>
                <input type="checkbox" checked={this.props.task.completed} 
                        onChange={(e)=>{this.props.toggleCompleted(this.props.indices)}}/>
                <span>{this.props.task.text}</span>
                <span className="fas fa-times-circle"
                      onClick={(e) => { e.stopPropagation(); this.props.onDeleteClicked(this.props.indices) }}></span>
                <ul>
                    {subtasks}
                </ul>
            </li>
        )
    }
}

export default Task;